<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class SubFabricColor extends Model
{

    use HasFactory, HasUuids;

    protected $table = 'sub_fabric_colors';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'name',
        'group_fabric_color_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function fabricColors() {
        return $this->hasMany(FabricColor::class, 'sub_fabric_color_id', 'id');
    }
}
