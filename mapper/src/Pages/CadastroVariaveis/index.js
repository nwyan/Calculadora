import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    FormGroup,
    Typography,
    Button,
    TextField,
    Paper,
    MenuItem,
    Card,
    CardContent,

}from '@material-ui/core';
import {ArrowBack, RemoveCircleOutline} from '@material-ui/icons'
import { Link } from 'react-router-dom';
import { VscSymbolOperator } from 'react-icons/vsc';
import './styles.css';
import api from '../../Connections/api';
import { green, purple } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
const AdicionarTipoBtn = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: "#8C540F",
        '&:hover': {
            backgroundColor: '#F28705',
          },
    }
}))(Button)
const AdicionarVarBtn = withStyles((theme) => ({
    root: {
        color: '#FFF',
        backgroundColor: "#18591C",
        '&:hover': {
            backgroundColor: '#5BA971',
          },
    }
}))(Button)
const useStylesGrid = makeStyles((theme) => ({  
    root: {
      flexGrow: 1,
    },
    title: {
        marginLeft: '15px',
        color: 'rgb(85, 85, 85)',
        textTransform: 'inherit',
        fontSize: '1.3rem',
        fontWeight: '600',
        // fontFamily: "'Open Sans', sans-serif",
        opacity: '1',
        cursor: 'unset',
    },
    titleVariable: {          
        color: 'rgb(85, 85, 85)',
        textTransform: 'inherit',
        fontSize: '1.1rem',
        fontWeight: '600',
        // fontFamily: "'Open Sans', sans-serif",
        opacity: '1',
    },
    paperHeader: {
        padding: theme.spacing(2),
        textAlign: 'left',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    //   color: theme.palette.text.secondary,
    },
    formfield: {
        marginBottom: '10px',
        backgroundColor: 'blue',
    },       
    btnConfirm: {
        margin: '8px',
        backgroundColor: 'green',
        padding: '8px',       
        borderRadius: '5px',
        color: 'white',
        '&:hover': {
            backgroundColor: 'darkgreen',
            color: 'white',
        },
    },
   
    btnCancel: {       
        backgroundColor: '#aaa',
        padding: '10px 8px',
        borderRadius: '5px',
        color: 'white',
        '&:hover': {
            backgroundColor: '#888',
            color: 'white',
        },
    },
}));

export default function CadastroVariaveis ({navigation}) {

    const [form, setForm] = useState({ cards: [] });
    const [cadastro, setCadastro] = useState();
    const [args, setArgs] = useState([]);
    const [operations, setOperations] = useState([
        {
            id: 0, name: 'Operação', value: null
        },
        {
            id: 1, name: "Soma", value: "sum"
        },
        {
            id: 2, name: "Divisão", value: "div"
        },
        {
            id: 3, name: "Multiplicação", value: "mux"
        },
        {
            id: 4, name: "Máscara", value: "mask"
        },
    ]);
    const [ordemByte, setOrdemBytes] = useState([{ id: 0, name: '', value: '' }, { id: 1, name: 'Little-endian (trás p/ frente)', value: 'little' }, { id: 2, name: 'Big-endian (frente p/ trás)', value: 'big' },])
    const [saveOrdemByte, setSaveOrdemByte] = useState(1);
    const [tamanhoByte, setTamanhoByte] = useState('');
    const [nome, setNome] = useState('');
    
    const addNewCamp = () => {
        let newForm = { ...form}
        let newCard = {
            variavel: "",
            bitInicial: "",
            bitFinal: "",
            saveArgs: [],
            operationsSelects: []
        }
        newForm,cards,push(newCard);
        setForm(newForm)
    }
    
    const addNewOpperation = (index) => {
        let newForm = { ...form}
        let newOperationSelect = {
            operacao: [],
            args:[]
        }
        newForm.cards[index].operationsSelects.push(newOperationSelect);
        newForm.cards[index].saveArgs.push(newOperationSelect);
        setForm(newForm)
    }
    
    const onFormUpdate = (e, index) => {
        let newForm = { ...form}
        newForm.cards[index][e.target.name] = e.target.value;
        setForm(newForm)
    }
    
    function onOperationSelectUpdate(e, cardIndex, selectIndex) {
        let newForm = { ...form};
        newForm.cards[cardInde].operationsSelects[selectIndex].operacao = e.target.value;
        setForm(newForm);
    }
    function newArgs(e, cardIndex, selectIndex) {
        let newForm = { ...forms};
        newForm.cards[cardIndex].saveArgs[selectIndex].args = e.target.value;
        setForm(newForm);
    }
    
    function onOrdemByte(e) {
        setOrdemBytes(e.target.value)
    }
    
    function operationRemove(cardIndex, selectIndex) {
        let newForm = { ...forms };
        newForm.cards[cardIndex].operationsSelects.splice(selectIndex, 1);
        setForm(newForm);
    }
    
    const removeOperacao = (cardIndex, selectIndex) => {
        //setForm([...newCard.filter((_, index) => index !== position)])
        let newForm = { ...forms };
        newForm.cards.splice(cardIndex, 1)
        setForm(newForm);
    }
    
    console.log(cadastro)
    
    async function handleCadastro() {
        const params = {
            name: nome,
            tamanhoByte: tamanhoByte,
            ordemByte: saveOrdemByte,
            variables: form,
        }
    
        api.post(`types/`, params)
            .then(res => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log('Erro: ' + err)
            })
    }
    
    const classes = useStylesGrid();
    
    return (
    
        <Container fluid style={{marginTop: '5px'}} >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paperHeader}>  
                        {/* <img src={mqttIcon} alt="mqtt logo" width="70"></img>                         */}
                        <span className={classes.title}>Cadastro do Tipo</span>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <FormGroup onSubmit={handleCadastro}>
                            <FormGroup>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6}>
                                            <TextField className={classes.formField} variant="filled" label="Nome do Tipo" value={nome} onChange={(e) => setNome(e.target.value)} fullWidth/>
                                        </Grid>
                                    <Grid item xs={12} sm={6}>
                                            <TextField className={classes.formField} variant="filled" label="Tamanho Byte" value={tamanhoByte} onChange={(e) => setTamanhoByte(e.target.value)} fullWidth/>                                   
                                        </Grid>
                                    <Grid item xs={12}>
                                        <TextField className={classes.formField} variant="filled" label="Ordem dos Bits de Dados" select value={saveOrdemByte} onChange={e => setSaveOrdemByte(e.target.value)} fullWidth="true" >
                                                {ordemByte.map((byte) => (
                                                    <MenuItem key={byte.id} value={byte.value}>{byte.name}</MenuItem>
                                                ))}
                                            </ TextField>
                                    </Grid>
                                </Grid>
                            </FormGroup>
    
                        {form.cards.length > 0 && form.cards.map((card, index) => (
                            <Card key={index} style={{ marginBottom: 20, marginTop: 20 }}>
                                <CardContent>
                                    <span className={classes.titleVariable}>{`Variável ${index + 1}`}</span>
                                        <FormGroup>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <TextField variant="filled" label={`Nome da variável ${index + 1}`} name="variavel" onChange={(e) => onFormUpdate(e, index)} fullWidth/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField variant="filled" label={`Byte inicial ${index + 1}`} name="bitInicial" onChange={(e) => onFormUpdate(e, index)} fullWidth />       
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField variant="filled" label={`Byte final ${index + 1}`} name="bitFinal" onChange={(e) => onFormUpdate(e, index)} fullWidth/>
                                                </Grid>
                                            </Grid>
    
                                                {form.cards[index].operationsSelects &&
                                                    form.cards[index].operationsSelects.length > 0 &&
                                                    form.cards[index].operationsSelects.map((operationSelect, i) => (
                                                        <FormGroup row key={i} >
                                                        <Grid container spacing={1} direction="row" justifyContent="center" alignItems="center" style={{backgroundColor: "lightgreen", margin: 10, padding: 10}}>
                                                            <Grid item xs={12} sm={3} >
                                                                <TextField variant="outlined" select label="Operação" value={form.cards[index].operationsSelects[i].operacao} onChange={(e) => onOperationSelectUpdate(e, index, i)} fullWidth>
                                                                    {operations.map((operation) => (
                                                                        <MenuItem key={operation.id} value={operation.value}>{operation.name}</MenuItem>
                                                                    ))}
                                                                </TextField>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField variant="outlined" label="ARGS" name="saveArgs" onChange={(e) => newArgs(e, index, i)} fullWidth/>
                                                            </Grid>
                                                            <Grid item xs={12} sm={1} >
                                                                <Button variant="contained" color="secondary" onClick={() => operationRemove(index, i)}  ><RemoveCircleOutline style={{ fontStyle: 30 }} /></Button>
                                                            </Grid>
                                                        </Grid>                                                                                                                                                                                                                                   
                                                    </FormGroup>
                                            ))
                                        }
                                        <FormGroup row>
                                                <Button style={{ width: 50, height: 50, margin: 10 }} onClick={() => addNewOperation(index)} color="primary" variant="contained"><VscSymbolOperator size={25} /></Button>                                           
                                            </FormGroup>
                                        </FormGroup>
                                    </CardContent>
                                </Card>
                            ))
    
                            }
                            <FormGroup row>
                                <AdicionarVarBtn style={{ marginBottom: '10px', marginTop: 20 }} variant="contained" color="primary" onClick={() => addNewCamp()}>Adicionar variável</AdicionarVarBtn>
                            </FormGroup>
                        </FormGroup>
                        <Link to="/cadastroEverynet" style={{ textDecoration: 'none' }}>
                            <AdicionarTipoBtn style={{ marginTop: 20 }} onClick={handleCadastro} variant="contained" color="primary">Adicionar tipo</AdicionarTipoBtn>
                        </Link>
                    </Paper>
                </Grid>
            </Grid>
    
        {/* <Container fluid>
            <Link to="/cadastroEverynet">
                <Button variant="contained" style={{ marginBottom: '2%', }}><ArrowBack style={{ fontSize: 30 }} /></Button>
            </Link>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20 }}>Cadastro do Tipo</Typography>
    
                    <FormGroup onSubmit={handleCadastro}>
                        <Paper elevation="3" style={{ padding: '20px 30px' }}>
                            <FormGroup row style={{ marginBottom: 20 }}>
                                <TextField label="Nome do Tipo" variant="outlined" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <TextField variant="outlined" label="Tamanho Byte" value={tamanhoByte} onChange={(e) => setTamanhoByte(e.target.value)} style={{ left: 20 }} />
                            </FormGroup>
                            <TextField label="Ordem dos Bits de Dados" variant="outlined" select value={saveOrdemByte} onChange={e => setSaveOrdemByte(e.target.value)} style={{ width: 230 }} >
                               {ordemByte.map((byte) => (
                                    <MenuItem key={byte.id} value={byte.value}>{byte.name}</MenuItem>
                                ))}
                            </TextField>
                        </Paper>
                        {forms.cards.length > 0 && form.cards.map((cards, index) => (
                            <Card key={index} style={{ marginBottom: 20, marginTop: 20 }}>
                                <CardContent>
                                    {`Campo ${index + 1}`}
                                    <FormGroup>
                                        <TextFied variant="outlined" label={`Variavel ${index + 1}`} style={{ marginBottom: '1%', width: '40%', marginRight: '1%' }} name="variavel" onChange={(e) => onFormUpdate(e, index)} />
                                        <TextFied variant="outlined" label={`Variavel ${index + 1}`} style={{ marginBottom: '1%', width: '30%', marginRight: '1%' }} name="bitInicial" onChange={(e) => onFormUpdate(e, index)} />
                                        <TextFied variant="outlined" label={`Variavel ${index + 1}`} style={{ marginBottom: '1%', width: '30%', marginRight: '1%' }} name="bitFinal" onChange={(e) => onFormUpdate(e, index)} />
                                        {forms.cards[index].operationSelects &&
                                            form.cards[index].operationSelects.length > 0 &&
                                            form.cards[index].operationSelects.map((operationSelect, i) => (
                                                <FormGroup row key={i} >
                                                    <TextField style={{ width: 150, marginBottom: 15 }} variant="outlined" select label="Operação" value={forms.cards[index].operationSelects[i].operacao} onChange={(e) => onOperationSelectUpdate(e, index, i)}>
                                                        {operations.map((operation) => (
                                                            <MenuItem key={operation.id} value={operation.value}>{operation.name}</MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField style={{ left: 10 }} variant="outlined" label="ARGS" name="saveArgs" onChange={(e) => newArgs(e, index, i)} />
                                                    <Button variant="contained" color="secondary" style={{ left: 20, margin: 10, top: -10}} onClick={() => operationRemove (index, i)}><RemoveCircleOutline style={{ fontStyle: 30 }} /></Button>
                                                </FormGroup>
                                            ))
                                        }
                                        <FormGroup row>
                                            <Button style={{ width: 50, height: 50 }} onClick={() => addNewOperation(index)} color="primary" variant="contained"><VscSymbolOperator size={25} /></Button>
                                            <Button style={{ marginLeft: '2%', width: 50, height: 50 }} onClick={() => removeOperacao(index)} color="secondary" variant="contained"><RemoveCircleOutline style={{ fontStyle: 30 }} /></Button>
                                        </FormGroup>
                                     </FormGroup>
                                    </CardContent>
                                </Card>
                            ))
                            }
    
                            <FormGroup row>
                                <AdicionarVarBtn style={{ marginBottom: '10px', marginTop: 20 }} variant="contained" color="primary" onClick={() => addNewCamp()}>Adicionar variável</AdicionarVarBtn>
                            </FormGroup>
                         </FormGroup>
    
                        <Link to="/cadastroEverynet" style={{ textDecoration: 'none' }}>
                            <AdicionarTipoBtn style={{ marginTop: 20 }} onClick={handleCadastro} variant="contained" color="primary">Adicionar tipo</AdicionarTipoBtn>
                     </Link>
                 </Grid>
             </Grid>
        */}
        </Container>
    )
}
