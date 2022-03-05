<?php
namespace Modules\Booking\Gateways;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Modules\Booking\Events\BookingCreatedEvent;
use Modules\Booking\Models\Payment;
use Mockery\Exception;
class ABAPaymentGateway extends BaseGateway
{
    public $name = 'ABA Payment';
    public function process(Request $request, $booking, $service)
    {
        $service->beforePaymentProcess($booking, $this);
        // Simple change status to processing

        if($booking->paid <= 0){
            $booking->status = $booking::PROCESSING;
        }

        $payment = new Payment();
        $payment->booking_id = $booking->id;
        $payment->payment_gateway = $this->id;
        $payment->status = 'completed';
        $data = $this->handlePurchaseData([
            'amount'        => (float)$booking->pay_now,
            'transactionId' => $booking->code . '.' . time()
        ], $booking, $payment);
        $payment->amount = $data['amount'];
        $payment->object_id = $booking->object_id;
        $payment->object_model = $booking->object_model;

        $payment->save();

        $booking->payment_id = $payment->id;
        $booking->paid += $data['amount'];

        if($booking->paid < $booking->total){
            $booking->status = $booking::PARTIAL_PAYMENT;
        }else{
            $booking->status = $booking::PAID;
        }
        $booking->save();

        try{
            event(new BookingCreatedEvent($booking));
        } catch(\Swift_TransportException $e){
            Log::warning($e->getMessage());
        }

        $service->afterPaymentProcess($booking, $this);
        return response()->json([
            'url' => $booking->getDetailUrl()
        ])->send();
    }

    public function processNormal($payment)
    {
        $payment->status = 'processing';
        $payment->save();

        return [true,__("Thank you, we will contact you shortly")];
    }

    public function getOptionsConfigs()
    {
        return [
            [
                'type'  => 'checkbox',
                'id'    => 'enable',
                'label' => __('Enable ABA Payment?')
            ],
            [
                'type'  => 'input',
                'id'    => 'name',
                'label' => __('Custom Name'),
                'std'   => __("ABA Payment"),
                'multi_lang' => "1"
            ],
            [
                'type'  => 'upload',
                'id'    => 'logo_id',
                'label' => __('Custom Logo'),
            ],
            [
                'type'  => 'textarea',
                'id'    => 'payment_note',
                'label' => __('Payment Note'),
                'multi_lang' => "1"
            ],
            [
                'type'  => 'editor',
                'id'    => 'html',
                'label' => __('Custom HTML Description'),
                'multi_lang' => "1"
            ],
        ];
    }
    public function handlePurchaseData($data, $booking, &$payment = null)
    {
        $main_currency = setting_item('currency_main');
        $supported = $this->supportedCurrency();
        $convert_to = $this->getOption('convert_to');
        $data['currency'] = $main_currency;
        $data['returnUrl'] = $this->getReturnUrl() . '?c=' . $booking->code;
        $data['cancelUrl'] = $this->getCancelUrl() . '?c=' . $booking->code;
        if (!array_key_exists($main_currency, $supported)) {
            if (!$convert_to) {
                throw new Exception(__("ABA does not support currency: :name", ['name' => $main_currency]));
            }
            if (!$exchange_rate = $this->getOption('exchange_rate')) {
                throw new Exception(__("Exchange rate to :name must be specific. Please contact site owner", ['name' => $convert_to]));
            }
            if ($payment) {
                $payment->converted_currency = $convert_to;
                $payment->converted_amount = $booking->pay_now / $exchange_rate;
                $payment->exchange_rate = $exchange_rate;
            }
            $data['originalAmount'] = (float)$booking->pay_now;
            $data['amount'] = number_format( (float)$booking->pay_now / $exchange_rate , 2 );
            $data['currency'] = $convert_to;
        }
        return $data;
    }

    public function supportedCurrency()
    {
        return [
            "aud" => "Australian dollar",
            "brl" => "Brazilian real 2",
            "cad" => "Canadian dollar",
            "czk" => "Czech koruna",
            "dkk" => "Danish krone",
            "eur" => "Euro",
            "hkd" => "Hong Kong dollar",
            "huf" => "Hungarian forint 1",
            "inr" => "Indian rupee 3",
            "ils" => "Israeli new shekel",
            "jpy" => "Japanese yen 1",
            "myr" => "Malaysian ringgit 2",
            "mxn" => "Mexican peso",
            "twd" => "New Taiwan dollar 1",
            "nzd" => "New Zealand dollar",
            "nok" => "Norwegian krone",
            "php" => "Philippine peso",
            "pln" => "Polish złoty",
            "gbp" => "Pound sterling",
            "rub" => "Russian ruble",
            "sgd" => "Singapore dollar ",
            "sek" => "Swedish krona",
            "chf" => "Swiss franc",
            "thb" => "Thai baht",
            "usd" => "United States dollar",
        ];
    }

}
