import { Router } from 'express';
import pool from '../database.js';

const router = Router();

//router.get('/addS', (req, res) => {
//    res.render('productos/addS');
//});

router.post('/addS', async (req, res) => {
    try {
        const { idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
        const newSucursal = {
            idEmpresa, descripcion, direccion, telefono, encargado, estado
        };
        await pool.query('INSERT INTO inv_productos SET ?', [newSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/addS', async (req, res) => {
    try {
        const [empresas] = await pool.query('SELECT idEmpresa, nombre FROM gen_empresas');
        res.render('productos/addS', { empresas });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/listS', async (req, res) => {
    try {
        const [result] = await pool.query("select descripcion, precio_venta, precio_oferta from bp_productos where oferta = 'S'");
        res.render('productos/lista_productos', { productos: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/editS/:idSucursal', async (req, res) => {
    try {
        const { idSucursal } = req.params;

   
        const [sucursalResult] = await pool.query('SELECT * FROM inv_productos WHERE idSucursal = ?', [idSucursal]);
        const sucursal = sucursalResult[0]; 

       
        const [empresas] = await pool.query('SELECT idEmpresa, nombre FROM gen_empresas');

       
        res.render('productos/editS', { sucursal, empresas });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/editS/:idSucursal', async (req, res) => {
    try {
        const { idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
        const { idSucursal } = req.params;
        const editSucursal = {
            idEmpresa, descripcion, direccion, telefono, encargado, estado
        };
        await pool.query('UPDATE inv_productos SET ? WHERE idSucursal = ?', [editSucursal, idSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/deleteS/:idSucursal', async (req, res) => {
    try {
        const { idSucursal } = req.params;
        await pool.query('DELETE FROM inv_productos WHERE idSucursal = ?', [idSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
