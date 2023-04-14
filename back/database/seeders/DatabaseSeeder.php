<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Faculty;
use App\Models\FormOfEducation;
use App\Models\Group;
use App\Models\Post;
use App\Models\Project;
use App\Models\Subject;
use App\Models\User;
use App\Models\UserInfo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//         \App\Models\User::factory(60)->create();

        Faculty::factory()
            ->create([
                'faculty_name' => 'Прикладное программирование'
            ])
            ->create([
                'faculty_name' => 'Информационная безопасность'
            ]);

        FormOfEducation::factory()
            ->create([
                'education_name' => 'Очная'
            ])
            ->create([
                'education_name' => 'Заочная'
            ]);

        Group::factory()
            ->create([
                'group_name' => 'ПИ-41'
            ])
            ->create([
                'group_name' => 'ИБ-41'
            ])
            ->create([
                'group_name' => 'ИБА-41'
            ]);
        UserInfo::factory()
            ->create([
                'faculty_id' => Faculty::query()->where('id', 1)->value('id'),
            ])
            ->create([
                'faculty_id' => Faculty::query()->where('id', 2)->value('id'),
            ])
            ->create([
                'faculty_id' => Faculty::query()->where('id', 2)->value('id'),
                'record_book' => '1',
                'group_id' => Group::query()->where('id', 3)->value('id'),
                'form_of_education_id' => FormOfEducation::query()->where('id', 1)->value('id')
            ]);

        Subject::factory()->createMany([
            ['subject_name' => 'Оформление проектной деклорации'],
            ['subject_name' => 'Инженерное обеспечение современного интерьера'],
            ['subject_name' => 'Технологии полиграфии'],
            ['subject_name' => 'История искусств. Эстетика архитектуры и дизайна']
        ]);

        Post::factory()->createMany([
            ['post_name' => 'Профессор'],
            ['post_name' => 'Старший преподователь'],
            ['post_name' => 'Лаборант'],
            ['post_name' => 'Преподователь'],
            ['post_name' => 'Доцент'],
            ['post_name' => 'Староста'],
            ['post_name' => 'Профорг'],
            ['post_name' => 'Заведующий кафедрой "Дизайна"'],
            ['post_name' => 'Руководитель образовательного центра'],
            ['post_name' => 'Специалист по учебно-методической работе'],
            ['post_name' => 'Старший диспетчер'],
            ['post_name' => 'Учебный мастер']
        ]);

        User::factory()
            ->create([
                'first_name' => 'Гаршин',
                'last_name' => 'Илья',
                'middle_name' => 'Андреевич',
                'email' => 'facyoucraft@gmail.com',
                'password' => bcrypt(12345),
                'phone_number' => '7 800 555-35-35',
                'role' => 'lecturer',
                'post_id' => Post::query()->where('id', 1)->value('id'),
                'subject_id' => Subject::query()->where('id', 1)->value('id'),
                'user_info_id' => UserInfo::query()->where('id', 1)->value('id')
            ])
            ->create([
                'first_name' => 'Недоступов',
                'last_name' => 'Олег',
                'middle_name' => 'Юрьевич',
                'email' => 'onedostupov@gmail.com',
                'password' => bcrypt(12345),
                'phone_number' => '7 863-270-05-00',
                'role' => 'lecturer',
                'post_id' => Post::query()->where('id', 2)->value('id'),
                'subject_id' => Subject::query()->where('id', 4)->value('id'),
                'user_info_id' => UserInfo::query()->where('id', 2)->value('id')
            ])
            ->create([
                'first_name' => 'Администратор',
                'last_name' => 'Администраторов',
                'middle_name' => 'Администратович',
                'email' => 'admin@universityn.com',
                'password' => bcrypt(12345),
                'phone_number' => '7 918 526-92-03',
                'role' => 'administration',
                'subject_id' => Subject::query()->where('id', 1)->value('id'),
                'post_id' => Post::query()->where('id', 8)->value('id')
            ])
            ->create([
                'first_name' => 'Студент',
                'last_name' => 'Студентов',
                'middle_name' => 'Стунедтович',
                'email' => 'student@universityn.com',
                'password' => bcrypt(12345),
                'phone_number' => '7 989 633-82-46',
                'role' => 'student',
                'post_id' => Post::query()->where('id', 6)->value('id'),
                'subject_id' => Subject::query()->where('id', 1)->value('id'),
                'user_info_id' => UserInfo::query()->where('id', 3)->value('id')
            ]);


        $numberOfUsers = 90;
        $usersPerRole = 30;

        $roles = ['lecturer', 'administration', 'student'];

        for ($i = 0; $i < $numberOfUsers; $i++) {
            $roleIndex = intdiv($i, $usersPerRole);
            $role = $roles[$roleIndex];

            User::factory()->create([
                'first_name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'middle_name' => fake()->firstName(),
                'email' => fake()->unique()->safeEmail(),
                'password' => bcrypt(1245), // password
                'phone_number' => fake()->unique()->phoneNumber(),
                'role' => $role,
                'subject_id' => Subject::query()->where('id', 1)->value('id'),
            ]);
        }

        Project::factory()->create([
            'userId' => User::query()->where('id', 1)->value('id'),
            'topic' => 'Дипломный проект на тему «Поглотительный ташет — актуальная национальная задача»',
            'taskTitle' => 'Дипломный проект на тему «Поглотительный ташет — актуальная национальная задача»',
            'description' => 'Согласно последним исследованиям, визуализация концепии порождает конструктивный рекламный блок. Поэтому PR программирует имидж. Поисковая реклама раскручивает конвергентный контент.',
        ]);

    }
}
