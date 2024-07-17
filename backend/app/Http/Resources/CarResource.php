<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {        
         return [
             'id'       => $this->id,
             'brand'    => $this->brand, 
             'model'    => $this->model, 
             'year'     => $this->year, 
             'price'    => $this->price, 
             'mileage'  => $this->mileage
         ];
    }
}
