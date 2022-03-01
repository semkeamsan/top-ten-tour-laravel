<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 7/11/2019
 * Time: 4:54 PM
 */
namespace App\Http\Middleware;

use App\Currency;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class SetCurrentCurrency
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param  string|null $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if($code = $request->query('set_currency'))
        {
            $all = Currency::getActiveCurrency();
            if(!empty($all)){
                $exchange_rate = Currency::getCurrent('rate',1);
                foreach ($all as $item){
                    if($item['currency_main'] == $code){
                        Session::put('bc_current_currency',$code);
                        $data = $request->query();
                        unset($data['set_currency']);

                        if ($price_range = $request->price_range) {
                            $pri_from = explode(";", $price_range)[0];
                            $pri_to = explode(";", $price_range)[1];
                            if($code == 'usd'){

                                $pri_from = Currency::convertToMain($pri_from,$exchange_rate);
                                $pri_to = Currency::convertToMain($pri_to,$exchange_rate);
                              
                            }else{
                                $pri_from = Currency::convertPrice($pri_from);
                                $pri_to = Currency::convertPrice($pri_to);
                            }

                            $data['price_range'] = $pri_from.';'.$pri_to;
                        }

                        $url = $request->url();

                        if (!empty($data)) {
                            $url .= '?' . http_build_query($data);
                        }


                        return redirect()->to($url);
                    }
                }
            }
        }

        return $next($request);
    }
}
