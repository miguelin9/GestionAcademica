/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.iesvdc.acceso.dao;

import com.iesvdc.acceso.pojo.Profesor;
import java.util.List;

/**
 *
 * @author profesor
 */
public interface ProfesorDAO {

    public void create(Profesor al) throws DAOException;

    public void update(Profesor old_al, Profesor new_al) throws DAOException;

    public void update(Integer old_id, Profesor new_al) throws DAOException;

    public void delete(Integer id) throws DAOException;

    public void delete(Profesor al) throws DAOException;

    public Profesor findById(Integer Id) throws DAOException;

    public List<Profesor> findByNombre(String nombre) throws DAOException;

    public List<Profesor> findByApellido(String apellido) throws DAOException;

    public List<Profesor> findAll() throws DAOException;

    public List<Profesor> findByNombreApellido(String nombre, String apellido) throws DAOException;
}
