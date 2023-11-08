"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";

async function loadPropiedades() {
  try {
    const response = await axios.get("/api/propiedades");
    return response.data;
  } catch (error) {
    console.error("Error load propiedades:", error);
    return [];
  }
}
function obtenerClaseEstado(estado) {
  switch (estado) {
    case "Libre":
      return "bg-green-500 text-white";
    case "Ocupada":
      return "bg-red-500 text-white";
    case "Mantenimiento":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500 text-white";
  }
}
function PropiedadesList() {
  const [propiedades, setPropiedad] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const data = await loadPropiedades();
      setPropiedad(data);
    };
    fetchPropiedades();
  }, []);
  const deletePropiedades = async (id) => {
    try {
      if (confirm("Estas seguro de eliminar esta propiedad?")) {
        const res = await axios.delete(`/api/propiedades/${id}`);
        if (res.status === 204) {
          // Update the Propiedadess state after successful deletion
          setPropiedad((prevPropiedadess) =>
            prevPropiedadess.filter((Propiedades) => Propiedades.id !== id)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting Propiedades:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold  m-8">
        Lista de Propiedades{" "}
        <Link
          href="/propiedades/crear"
          className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5"
        >
          Registrar
        </Link>
      </h2>
      <div className="shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <table className="min-w-full text-left text-sm font-light">
          <thead>
            <tr className="border-b font-medium bg-gray-300">
              <th>Opciones</th>
              <th>Id Propiedad</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
              <th>Precio Alquiler</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.map((pro, index) => {
              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      title="Eliminar"
                      className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                      onClick={() => deletePropiedades(pro.id)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{pro.id}</td>
                  <td className="whitespace-nowrap px-6 py-4">{pro.nombre}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.direccion}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.caracteristicas}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full ${obtenerClaseEstado(
                        pro.estado
                      )}`}
                    >
                      {pro.estado}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    💸{pro.precioalquiler}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PropiedadesList;
