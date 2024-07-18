"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, router]);

  async function fetchProfile() {
    try {
      const res = await fetch('/api/profile');
      console.log('Response status:', res.status); // Log the response status
      if (res.ok) {
        const data = await res.json();
        console.log('Profile data:', data); // Log the profile data
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("name", data.name);
        setValue("lastname", data.lastname);
        setValue("dni", data.dni);
      } else {
        const errorData = await res.json();
        console.error('Error fetching profile:', errorData); // Log the error data
        throw new Error(errorData.message || "Error al obtener los datos del perfil");
      }
    } catch (error) {
      console.error('Fetch profile error:', error.message); // Log the error message
      setServerError(error.message);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setServerError("");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log('Update response status:', res.status); // Log the response status
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error updating profile:', errorData); // Log the error data
        throw new Error(errorData.message || "Error al actualizar el perfil");
      }

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error('Update profile error:', error.message); // Log the error message
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  });

  if (status === 'loading') return <div>Cargando...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Perfil de Usuario
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{serverError}</span>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                  minLength: { value: 3, message: "El nombre de usuario debe tener al menos 3 caracteres" }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Nombre de Usuario"
              />
              {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Dirección de correo electrónico inválida"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Correo Electrónico"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre(s)
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "El nombre es requerido" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Nombre(s)"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="lastname" className="sr-only">
                Apellidos
              </label>
              <input
                id="lastname"
                type="text"
                {...register("lastname", { required: "Los apellidos son requeridos" })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Apellidos"
              />
              {errors.lastname && <p className="mt-2 text-sm text-red-600">{errors.lastname.message}</p>}
            </div>
            <div>
              <label htmlFor="dni" className="sr-only">
                DNI
              </label>
              <input
                id="dni"
                type="text"
                {...register("dni", {
                  required: "El DNI es requerido",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "DNI inválido. Debe tener 8 dígitos seguidos"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="DNI"
              />
              {errors.dni && <p className="mt-2 text-sm text-red-600">{errors.dni.message}</p>}
            </div>
            <div>
              <label htmlFor="currentPassword" className="sr-only">
                Contraseña Actual
              </label>
              <input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Contraseña Actual (dejar en blanco si no cambia)"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="sr-only">
                Nueva Contraseña
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword", {
                  minLength: {
                    value: 8,
                    message: "La nueva contraseña debe tener al menos 8 caracteres"
                  }
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white bg-opacity-50"
                placeholder="Nueva Contraseña (dejar en blanco si no cambia)"
              />
              {errors.newPassword && <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
