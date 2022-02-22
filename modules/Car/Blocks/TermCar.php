<?php
namespace Modules\Car\Blocks;

use Modules\Core\Models\Terms;
use Modules\Template\Blocks\BaseBlock;
use Modules\Car\Models\Car;
use Modules\Location\Models\Location;

class TermCar extends BaseBlock
{
    function __construct()
    {
        $this->setOptions([
            'settings' => [
                [
                    'id'        => 'title',
                    'type'      => 'input',
                    'inputType' => 'text',
                    'label'     => __('Title')
                ],
                [
                    'id'           => 'term_car',
                    'type'         => 'select2',
                    'label'        => __('Select term car'),
                    'select2'      => [
                        'ajax'     => [
                            'url'      => route('car.admin.attribute.term.getForSelect2', ['type' => 'car']),
                            'dataType' => 'json'
                        ],
                        'width'    => '100%',
                        'multiple' => "true",
                    ],
                    'pre_selected' => route('car.admin.attribute.term.getForSelect2', [
                        'type'         => 'car',
                        'pre_selected' => 1
                    ])
                ]
            ],
            'category'=>__("Car Blocks")
        ]);
    }

    public function getName()
    {
        return __('Car: List Term Items');
    }

    public function content($model = [])
    {
        $car_terms = Terms::whereIn('id',$model['term_car'])->get();
        $data = [
            'terms'      => $car_terms,
            'title'      => $model['title'] ?? "",
        ];
        return view('Car::frontend.blocks.term-car.style_1', $data);
    }

    public function contentAPI($model = []){
        $rows = $this->query($model);
        $model['data']= $rows->map(function($row){
            return $row->dataForApi();
        });
        return $model;
    }

    public function query($model){
        $model_car = Car::select("bc_cars.*")->with(['location','translations','hasWishList']);
        if(empty($model['order'])) $model['order'] = "id";
        if(empty($model['order_by'])) $model['order_by'] = "desc";
        if(empty($model['number'])) $model['number'] = 5;
        if (!empty($model['location_id'])) {
            $location = Location::where('id', $model['location_id'])->where("status","publish")->first();
            if(!empty($location)){
                $model_car->join('bc_locations', function ($join) use ($location) {
                    $join->on('bc_locations.id', '=', 'bc_cars.location_id')
                        ->where('bc_locations._lft', '>=', $location->_lft)
                        ->where('bc_locations._rgt', '<=', $location->_rgt);
                });
            }
        }

        if(!empty($model['is_featured']))
        {
            $model_car->where('is_featured',1);
        }

        $model_car->orderBy("bc_cars.".$model['order'], $model['order_by']);
        $model_car->where("bc_cars.status", "publish");
        $model_car->with('location');
        $model_car->groupBy("bc_cars.id");
        return $model_car->limit($model['number'])->get();
    }
}
