@if(floatval($booking->deposit))
    @php
        $deposit_info =  $booking->getJsonMeta('deposit_info');
    @endphp
    <hr>
    <div class="form-section">
        <h4 class="form-section-title">{{__("How do you want to pay?")}}</h4>
        <div class="deposit_types gateways-table accordion ">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h4 class="mb-0"><label ><input type="radio" checked name="how_to_pay" value="deposit">
                                {{__("Pay deposit")}}
                                @if ($deposit_info['type'] == 'percent')
                                    ({{ $deposit_info['amount'] }}%)
                                @endif

                            </label></h4>
                        <span class="price"><strong>{{format_money($booking->deposit)}}</strong></span>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between">
                        <h4 class="mb-0"><label ><input type="radio"  name="how_to_pay" value="full">
                                {{__("Pay in full")}}
                            </label></h4>
                        <span class="price"><strong>{{format_money($booking->total)}}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endif
