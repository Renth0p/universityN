<?php

namespace App\Http\Controllers;

use App\Http\Resources\Project\ProjectResource;
use App\Http\Resources\User\UserResource;
use App\Models\Project;
use App\Models\ProjectFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProjectController extends Controller
{
    /**
     * @OA\Get(
     *     path="/projects",
     *     summary="Get a list of projects",
     *     tags={"Projects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Returns a list of projects",
     *         @OA\JsonContent(
     *             @OA\Property(type="integer", property="id"),
     *             @OA\Property(type="string", property="taskTitle"),
     *             @OA\Property(type="string", property="description"),
     *             @OA\Property(type="string", property="status"),
     *             @OA\Property(type="string", property="topic"),
     *             @OA\Property(
     *                 type="object",
     *                 property="subject",
     *                 @OA\Property(type="string", property="subject")
     *             ),
     *             @OA\Property(
     *                 type="array",
     *                 property="files",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(type="integer", property="id"),
     *                     @OA\Property(type="string", property="fileName"),
     *                     @OA\Property(type="string", property="filePath"),
     *                     @OA\Property(type="string", property="created")
     *                 )
     *             ),
     *             @OA\Property(type="string", property="created"),
     *             @OA\Property(type="string", property="deadline")
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthorized"
     *     )
     * )
     */
    public function getProjects(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();
        $project = Project::where(["userId" => $user->id])->get();

        if ($project) {
            return ProjectResource::collection($project);
        }

        return 'null';
    }

    /**
     * @OA\Post(
     *     path="/projects/create",
     *     summary="Create a new project",
     *     tags={"Projects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         description="Project data",
     *         @OA\JsonContent(
     *             @OA\Property(type="string", property="topic"),
     *             @OA\Property(type="string", property="taskTitle"),
     *             @OA\Property(type="string", property="description"),
     *             @OA\Property(type="string", format="date-time", property="deadline"),
     *             @OA\Property(type="string", property="status"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Project created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(type="integer", property="id"),
     *                 @OA\Property(type="string", property="taskTitle"),
     *                 @OA\Property(type="string", property="description"),
     *                 @OA\Property(type="string", format="date-time", property="deadline"),
     *                 @OA\Property(type="string", property="status"),
     *                 @OA\Property(type="string", property="topic"),
     *                 @OA\Property(
     *                     type="object",
     *                     property="subject",
     *                     @OA\Property(type="string", property="subject")
     *                 ),
     *                 @OA\Property(
     *                     type="array",
     *                     property="files",
     *                     @OA\Items(
     *                         @OA\Property(type="integer", property="id"),
     *                         @OA\Property(type="string", property="fileName"),
     *                         @OA\Property(type="string", property="filePath"),
     *                         @OA\Property(type="string", format="date-time", property="created")
     *                     )
     *                 ),
     *                 @OA\Property(type="string", format="date-time", property="created")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthorized",
     *     ),
     *     @OA\Response(
     *         response="422",
     *         description="Validation errors",
     *         @OA\JsonContent(
     *             @OA\Property(type="string", property="message"),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\AdditionalProperties(
     *                     type="array",
     *                     @OA\Items(type="string")
     *                 )
     *             )
     *         )
     *     )
     * )
     */
    public function createProject(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        $project = new Project([
            'userId' => $user->id,
            'topic' => $request['topic'],
            'taskTitle' => $request['taskTitle'],
            'description' => $request['description'],
            'deadline' => $request['deadline'] ?? null,
            'status' => $request['status'],
        ]);

        $project->save();


//        if ($request->hasFile('files')) {
//            foreach ($request->file('files') as $file) {
//                $filename = $file->getClientOriginalName();
//                if (ProjectFile::where(['fileName' => $filename])) {
//                    Storage::disk('public')->delete(
//                        'public/projectFile/' . $user->id . '/' . $request->input('taskTitle'),
//                        $filename);
//                }
//                $path = $file->storeAs(
//                    'public/projectFile/' . $user->id . '/' . $request->input('taskTitle'),
//                    $filename
//                );
//
//                $projectFile = new ProjectFile([
//                    'projectId' => $project->id,
//                    'fileName' => $filename,
//                    'filePath' => $path
//                ]);
//                $projectFile->save();
//            }
//        }
        if ($request->hasFile('files')) {
            $file = $request->file('files');
            $filename = $file->getClientOriginalName();
            $path = $file->storeAs(
                'public/projects/' . 'uid' .$user->id . '/' . $request->input('taskTitle'),
                $filename
            );

            $projectFile = new ProjectFile([
                'projectId' => $project->id,
                'fileName' => $filename,
                'filePath' => '/projects/uid' . $user->id . '/' . $request->input('taskTitle') . '/' . $filename
            ]);
            $projectFile->save();
        }

        return response()->json(['message' => 'Проект успешно создан.']);
    }

    /**
     * @OA\Post(
     *     path="/projects/update",
     *     summary="Update project data",
     *     tags={"Projects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(type="integer", property="id"),
     *             @OA\Property(type="string", property="topic"),
     *             @OA\Property(type="string", property="taskTitle"),
     *             @OA\Property(type="string", property="description"),
     *             @OA\Property(type="string", property="deadline"),
     *             @OA\Property(type="string", property="status"),
     *             @OA\Property(
     *                 type="string",
     *                 property="files",
     *                 format="binary"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project data updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(type="string", property="message")
     *         )
     *     ),
     *     @OA\Response(
     *         response="401",
     *         description="Unauthorized"
     *     )
     * )
     */
    public function updateProjectData(Request $request)
    {
        $token = JWTAuth::parseToken();
        $user = $token->authenticate();

        if ($request->file('files')) {
            $projectFile = ProjectFile::find(['projectId' => $request->id]);
            $file = $request->file('files');
            $filename = $file->getClientOriginalName();
            if ($projectFile->fileName) {
                Storage::disk('public')->delete('public/projects/' . 'uid' .$user->id . '/' . $request->input('taskTitle'),
                    $filename);
            }
            $path = $file->storeAs(
                'public/projects/' . 'uid' .$user->id . '/' . $request->input('taskTitle'),
                $filename
            );
            $projectFile->filePath = '/projects/uid' . $user->id . '/' . $request->input('taskTitle') . '/' . $filename;
            $projectFile->fileName = $filename;

            $projectFile->save();
        }
        $project = Project::find($request->id);
        $request['topic'] === null ? : $project->topic = $request['topic'];
        $request['taskTitle'] === null ? : $project->taskTitle = $request['taskTitle'];
        $request['description'] === null ? : $project->description = $request['description'];
        $request['deadline'] === null ? : $project->deadline = $request['deadline'];
        $request['status'] === null ? : $project->status = $request['status'];

        $project->save();

    }

    /**
     * @OA\Delete(
     *     path="/projects/delete/{id}",
     *     summary="Delete a project by ID",
     *     tags={"Projects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the project to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Project successfully deleted",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Проект успешно удален"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Project not found",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Проект не найден"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function deleteProject(Request $request, $id)
    {
        $token = JWTAuth::parseToken();

        if (Project::find($id))
        {
            if (ProjectFile::where(['projectId' => $id])->first())
            {
                $projectFile = ProjectFile::where(['projectId' => $id])->first();
                $projectFile->delete();
            }
            $project = Project::find($id);
            $project->delete();

            return response()->json([
                'message' => 'Проект успешно удален'
            ], 200);
        }

        return response()->json([
            'message' => 'Проект не найден'
        ], 404);
    }

    /**
     * @OA\Delete(
     *     path="/projects/file/delete/{id}",
     *     summary="Delete a project file",
     *     tags={"Projects"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of the file to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="File deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="File not found"
     *     )
     * )
     */
    public function deleteFile(Request $request, $id)
    {
        $token = JWTAuth::parseToken();

        if (ProjectFile::find($id))
        {
            $projectFile = ProjectFile::find($id);
            $projectFile->delete();

            return response()->json([
                'message' => 'Файл успешно удален'
            ], 200);
        }

        return response()->json([
            'message' => 'Файл не найден'
        ], 404);
    }


}
