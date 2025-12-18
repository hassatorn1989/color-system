<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;
class GroupColor extends Model
{
    protected $table = 'group_color';
    /** @use HasFactory<\Database\Factories\GroupColorFactory> */
    use HasFactory;
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


    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function getColors() {
        return $this->hasMany(Color::class, 'group_color_id', 'id')->where('is_active', true)->orderBy('priority', 'asc');
    }
       
}
