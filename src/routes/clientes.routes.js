import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add',(req,res)=>{
    res.render('clientes/add');
});

router.post('/add', async(req,res)=>{
    try {
        const {nombre, password} = req.body;
        const newCliente = {
            nombre, password
        }
        await pool.query('insert into bp_clientes set ?', [newCliente]);
        res.redirect('/list');

    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req,res)=>{
    try {
        const [result] = await pool.query('select * from bp_clientes');
        res.render('clientes/lista_clientes', {clientes: result})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:idEmpresa', async(req,res)=>{
    try {
        const {idEmpresa} = req.params;
        const [empresa] = await pool.query('select * from bp_clientes where idEmpresa = ?', [idEmpresa]);
        const empresaEdit = empresa[0];
        res.render('clientes/edit',{empresa: empresaEdit});
    } catch (error) {
        res.status(500).json({message:err.message});
    }
});

router.post('/edit/:idEmpresa', async(req,res)=>{
    try {
        const { nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono} = req.body;
        const {idEmpresa} = req.params;
        const editEmpresa = {
            nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono
        };
        await pool.query('update bp_clientes set ? where idEmpresa = ?', [editEmpresa, idEmpresa]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/delete/:idEmpresa', async(req,res)=>{
    try {
        const {idEmpresa} = req.params;
        await pool.query('delete from bp_clientes where idEmpresa = ?', [idEmpresa]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

export default router;