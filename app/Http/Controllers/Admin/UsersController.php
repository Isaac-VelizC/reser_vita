<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\StoreUserRequest;
use App\Http\Requests\Account\UpdateUserRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    public function index(): Response
    {
        try {
            $users = User::orderBy('-created_at')->paginate(10);
            $status = $users->isEmpty() ? 'empty' : 'success';
            $message = $users->isEmpty() ? 'No hay usuarios disponibles' : 'Usuarios cargados correctamente';

            return Inertia::render('admin/users/Index', [
                'users' => $users,
                'message' => $message,
                'status' => $status
            ]);
        } catch (\Exception $e) {
            return Inertia::render('admin/users/Index', [
                'users' => [],
                'message' => 'Ocurrió un error al cargar los usuarios: ' . $e->getMessage(),
                'status' => 'error'
            ]);
        }
    }

    public function create(): Response
    {
        return Inertia::render('admin/users/Create');
    }

    public function edit($id): Response
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/users/Create', [
            'isEdit' => true,
            'user' => $user
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
            $validated['password'] = Hash::make($validated['password']);

            User::create($validated);

            DB::commit();

            return redirect()->route('admin.usuarios.index')
                            ->with('success', 'Usuario creado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();

            Log::error("Error al crear usuario: {$th->getMessage()}");

            return redirect()->back()
                            ->withErrors(['error' => 'Hubo un problema al registrar el usuario.'])
                            ->withInput();
        }
    }

    public function update(UpdateUserRequest $request, $id): RedirectResponse
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();
    
            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } /*else {
                unset($validated['password']);
            }*/
    
            $user = User::findOrFail($id);
            $user->update($validated);

            DB::commit();
    
            return redirect()->route('admin.usuarios.index')->with('success', 'Usuario actualizado correctamente.');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("Error al actualizar usuario: {$th->getMessage()}");
            return redirect()->back()
                            ->withErrors(['error' => 'Hubo un problema al actualizar el usuario.'])
                            ->withInput();
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return redirect()->back()->with('success', 'Usuario eliminado correctamente.');
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Usuario no encontrado.');
        } catch (\Throwable $e) {
            Log::error('Error eliminando usuario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al eliminar el usuario.');
        }
    }

    public function userHabilitiInhabilitaion($id): RedirectResponse
    {
        try {
            $user = User::findOrFail($id);
            // Alternar estado entre "active" y "suspended"
            if ($user->status === 'suspended') {
                $user->status = 'active';
                $message = 'Usuario habilitado correctamente.';
            } else {
                $user->status = 'suspended';
                $message = 'Usuario suspendido correctamente.';
            }
            $user->save();

            return redirect()->back()->with('success', $message);
        } catch (ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Usuario no encontrado.');
        } catch (\Throwable $e) {
            Log::error('Error cambiando estado del usuario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Ocurrió un error al actualizar el estado del usuario.');
        }
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);

        if (!empty($ids)) {
            User::whereIn('id', $ids)->delete();
        }

        return back()->with('success', 'Usuarios eliminados correctamente.');
    }

    public function bulkSuspend(Request $request)
    {
        $ids = $request->input('ids', []);

        if (!empty($ids)) {
            User::whereIn('id', $ids)->update(['status' => 'suspended']);
        }

        return back()->with('success', 'Usuarios suspendidos correctamente.');
    }

    public function bulkActivate(Request $request)
    {
        $ids = $request->input('ids', []);

        if (!empty($ids)) {
            User::whereIn('id', $ids)->update(['status' => 'active']);
        }

        return back()->with('success', 'Usuarios activados correctamente.');
    }
}
