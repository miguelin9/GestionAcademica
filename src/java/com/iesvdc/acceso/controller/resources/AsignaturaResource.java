/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.iesvdc.acceso.controller.resources;

import com.iesvdc.acceso.dao.AsignaturaDAO;
import com.iesvdc.acceso.dao.AsignaturaDAOImpl;
import com.iesvdc.acceso.dao.DAOException;
import com.iesvdc.acceso.pojo.Asignatura;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Juangu <jgutierrez at iesvirgendelcarmen.coms>
 */
@Path("/asignatura")
public class AsignaturaResource {

    @GET
    @Path("/")
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<Asignatura> getAsignaturas() {
        AsignaturaDAO as_dao = new AsignaturaDAOImpl();
        List<Asignatura> list_as;
        try {
            list_as = as_dao.findAll();
        } catch (DAOException ex) {
            list_as = new ArrayList<>();
            System.out.println(ex.getLocalizedMessage());
        }
        return list_as;
    }
    
    @PUT
    @Path("asignatura/{id}")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public void updateAsignatura(@PathParam("id") Integer id, Asignatura asig) {
        AsignaturaDAO asig_dao = new AsignaturaDAOImpl();
        try {
            asig_dao.update(id, asig);
        } catch (DAOException ex) {
            Logger.getLogger(ex.getLocalizedMessage());
        }
    }

    
    @POST
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("asignatura")
    public void createAsignatura(Asignatura asig) {
        AsignaturaDAO asig_dao = new AsignaturaDAOImpl();
        try {
            asig_dao.create(asig);
        } catch (DAOException ex) {
            Logger.getLogger(ex.getLocalizedMessage());
        }
        // return Response.status(200).entity(al).build();
    }
    
//    @DELETE
//    @Path("asignatura/{id}")
//    public void deleteProfesor(@PathParam("id") Integer id) {
//        ProfesorDAO pro_dao = new ProfesorDAOImpl();
//        try {
//            pro_dao.delete(id);
//        } catch (DAOException ex) {
//            Logger.getLogger(ex.getLocalizedMessage());
//        }
//    }

//    @GET
//    @Path("{id}")
//    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
//    public Asignatura getAsignaturaById(@PathParam("id") String id) {
//        AsignaturaDAO as_dao = new AsignaturaDAOImpl();
//        Asignatura as;
//        try {
//            as = as_dao.findById(Integer.parseInt(id));
//        } catch (DAOException ex) {
//            as = new Asignatura("Error", -1, -1, "Error");
//            System.out.println(ex.getLocalizedMessage());
//        }
//        return as;
//    }

//    @GET
//    @Path("apellido/{apellido}")
//    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
//    public List<Asignatura> getAsignaturaByCurso(@PathParam("curso") String curso) {
//        AsignaturaDAO as_dao = new AsignaturaDAOImpl();
//        List<Asignatura> list_as;
//        try {
//            list_as = as_dao.findByCurso(Integer.parseInt(curso));
//        } catch (DAOException ex) {
//            list_as = new ArrayList<>();
//            System.out.println(ex.getLocalizedMessage());
//        }
//        return list_as;
//    }

//    @GET
//    @Path("nombre/{nombre}")
//    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
//    public List<Asignatura> getAsignaturaByNombre(@PathParam("nombre") String nombre) {
//        AsignaturaDAO as_dao = new AsignaturaDAOImpl();
//        List<Asignatura> list_as;
//        try {
//            list_as = as_dao.findByName(nombre);
//        } catch (DAOException ex) {
//            list_as = new ArrayList<>();
//            System.out.println(ex.getLocalizedMessage());
//        }
//        return list_as;
//    }

}
