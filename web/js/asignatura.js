/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

/**
 * Creamos el objeto asignatura y todos sus métodos.
 */
$.asignatura = {};
// Configuración del HOST y URL del servicio
$.asignatura.HOST = 'http://localhost:8080';
$.asignatura.URL = '/GestionAcademica/rest/asignatura';

$.asignatura.panel_alta = '#panel_al_asig';
$.asignatura.panel_list = '#panel_li_asig';
$.asignatura.panel_modi = '#panel_mo_asig';
$.asignatura.panel_borr = '#panel_bo_asig';
$.asignatura.panel_erro = '#panel_error';

/**
 Esta función hace la llamada REST al servidor y crea la tabla con todos los asignaturas.
 */
$.asignatura.AsignaturaReadREST = function () {
    // con esta función jQuery hacemos la petición GET que hace el findAll()
    $.controller.doGet(
            this.HOST + this.URL,
            function (json) {
                $($.asignatura.panel_list).empty();
                $($.asignatura.panel_list).append('<h4>Listado de Asignaturas</h4>');
                var table = $('<table />').addClass('responsive-table highlight');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>ciclo</th>', '<th>curso</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    tbody.append($('<tr />').append('<td>' + json[clave].id + '</td>',
                            '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].ciclo + '</td>', '<td>' + json[clave].curso + '</td>'));
                }
                table.append(tbody);

                $($.asignatura.panel_list).append($('<div />').append(table));
                //$('tr:odd').css('background', '#CCCCCC');
            });
};

/**
 Esta función carga los datos del formulario y los envía vía POST al servicio REST
 */
$.asignatura.AsignaturaCreateREST = function () {
    // Leemos los datos del formulario pidiendo a jQuery que nos de el valor de cada input.
    var datos = {
        'nombre': $("#c_asig_nombre").val(),
        'ciclo': $("#c_asig_ciclo").val(),
        'curso': $("#c_asig_curso").val()
    };

    // comprobamos que en el formulario haya datos...
    if (datos.nombre.length > 2 && datos.ciclo.length > 2 && datos.curso.length > 0) {
        // doPost(target, datos, fn_exito)
        $.controller.doPost(
            $.this.HOST + $.this.URL,
            datos,
            function () {
                // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.asignatura.AsignaturaReadREST();
            });

        // cargamos el panel con id r_asignatura.
        $.controller.activate($.asignatura.panel_list);
    }

};

/**
 Crea un desplegable, un select, con todos los asignaturas del servicio para seleccionar la asignatura a eliminar
 */
$.asignatura.AsignaturaDeleteREST = function (id) {
    // si pasamos el ID directamente llamamos al servicio DELETE
    // si no, pintamos el formulario de selección para borrar.
    if (id !== undefined) {
        id = $('#d_asig_sel').val();
        // doDelete (target, id, fn_exito)
        $.controller.doDelete(
            $.this.HOST + $.this.URL,
            id,
            function () {
                // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.asignatura.AsignaturaReadREST();
                // cargamos el panel listado
                $.controller.activate($.asignatura.panel_list);
            });
    } else {
        // doGet (target, fn_exito)
        $.controller.doGet(
            this.HOST + this.URL,
            function (json) {
                // pintamos el formulario para ver a quien modificar
                $('select').material_select('destroy');
                $($.asignatura.panel_borr).empty();
                var formulario = $('<div />');
                formulario.addClass('input-field');
                var div_select = $('<div />');
                div_select.addClass('form-group');
                var select = $('<select id="d_asig_sel" />');
                select.addClass('form-group');
                for (var clave in json) {
                    select.append('<option value="' + json[clave].id + '">' + json[clave].nombre + ' ' + json[clave].ciclo + ' ' + json[clave].curso + '</option>');
                }
                formulario.append(select);
                formulario.append('<div class="form-group"></div>').append('<div class="btn btn-danger" onclick="$.asignatura.AsignaturaDeleteREST(1)"> eliminar! </div>');
                $($.asignatura.panel_borr).append(formulario);
                $('select').material_select();
            }); 
    }

};

/**
 Función para la gestión de actualizaciones. Hay tres partes: 
 1) Listado 
 2) Formulario para modificación
 3) Envío de datos al servicio REST (PUT)
 */

$.asignatura.AsignaturaUpdateREST = function (id, envio) {
    // si no le pasamos parámetro, hay que sacar la lista para 
    // pulsar sobre quien queremos actualizar
    if (id === undefined) {
        $.controller.doGet(
            this.HOST + this.URL,
            function (json) {
                $($.asignatura.panel_list).empty();
                $($.asignatura.panel_list).append('<h4>Pulse sobre una asignatura</h4>');
                var table = $('<table />').addClass('responsive-table highlight');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>ciclo</th>', '<th>curso</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    // le damos a cada fila un ID para luego poder recuperar los datos para el formulario en el siguiente paso
                    tbody.append($('<tr id="fila_' + json[clave].id + '" onclick="$.asignatura.AsignaturaUpdateREST(' + json[clave].id + ')"/>').append('<td>' + json[clave].id + '</td>',
                            '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].ciclo + '</td>', '<td>' + json[clave].curso + '</td>'));
                }
                table.append(tbody);
                $($.asignatura.panel_list).append($('<div />').append(table));
                // $('tr:odd').css('background', '#CCCCCC');
                $.controller.activate($.asignatura.panel_list);
            });
    } else if (envio === undefined) {
        var seleccion = "#fila_" + id + " td";
        var asig_id = ($(seleccion))[0];
        var asig_nombre = ($(seleccion))[1];
        var asig_ciclo = ($(seleccion))[2];
        var asig_curso = ($(seleccion))[3];

        $("#u_asig_id").val(asig_id.childNodes[0].data);
        $("#u_asig_nombre").val(asig_nombre.childNodes[0].data);
        $("#u_asig_ciclo").val(asig_ciclo.childNodes[0].data);
        $("#u_asig_curso").val(asig_curso.childNodes[0].data);
        // cargamos el panel 
        $.controller.activate($.asignatura.panel_modi);
    } else {
        //HACEMOS LA LLAMADA REST
        var datos = {
            'id': $("#u_asig_id").val(),
            'nombre': $("#u_asig_nombre").val(),
            'ciclo': $("#u_asig_ciclo").val(),
            'curso': $("#u_asig_curso").val()
        };

        // comprobamos que en el formulario haya datos...
        if (datos.nombre.length > 2 && datos.ciclo.length > 2) {
            // doPut(target, id, datos, fn_exito)
            $.controller.doPut(
                $.this.HOST + $.this.URL,
                $("#u_asig_id").val(),
                datos,
                function() { 
                    // esto es lo que se ejecuta cuando tengamos éxito tras el PUT
                    $.asignatura.AsignaturaReadREST();
                }
            );

            // cargamos el panel con id.
            $.controller.activate($.asignatura.panel_list);
        }
    }
};


/**
 Función para la gestión de errores y mensajes al usuario
 */
$.asignatura.error = function (title, msg) {
    $($.asignatura.panel_erro).empty();
    $($.asignatura.panel_erro).append('<h4>' + title + '</h4>');
    $($.asignatura.panel_erro).append('<p>' + msg + '</p>');

    // cargamos el panel con id 
    $.controller.activate($.asignatura.panel_erro);
};