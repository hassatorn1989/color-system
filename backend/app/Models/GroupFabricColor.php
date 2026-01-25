<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class GroupFabricColor extends Model
{
    use HasFactory, HasUuids;
    protected $table = 'group_fabric_colors';
    protected $fillable = [
        'id',
        'name',
        'is_active',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $keyType = 'string';
    public $incrementing = false;


    public function getSubFabricColors() {
        return $this->hasMany(SubFabricColor::class, 'group_fabric_color_id', 'id')->where('is_active', true);
    }
}
