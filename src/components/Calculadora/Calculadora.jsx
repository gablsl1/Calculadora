import React, { Component } from 'react'
import Botao from '../Botao/Botao'
import Display from '../Display/Display'
import './Calculadora.css'

const estadoInicial = {
    valorDisplay: '0',
    limparDisplay: false,
    operacao: null,
    valores: [0, 0],
    atual: 0
}

export default class Calculadora extends Component {
    
    state = {...estadoInicial}

    constructor(props) {
        super(props)
        this.limparDisplay = this.limparDisplay.bind(this)
        this.setOperacao = this.setOperacao.bind(this)
        this.adicionarDigito = this.adicionarDigito.bind(this)
    }

    limparDisplay() {
        this.setState({...estadoInicial})
    }

    setOperacao(operacao) {
        if(this.state.atual === 0) {
            this.setState({ operacao, atual: 1, limparDisplay: true })
        } else {
            const igual = operacao === '='
            const operacaoAtual = this.state.operacao

            const valores = [...this.state.valores]

            try {
            valores[0] = eval(`${valores[0]} ${operacaoAtual} ${valores[1]}`)
            } catch(e) {
                valores[0] = this.state.valores[0]
            }

            valores[1] = 0

            this.setState({
                valorDisplay: valores[0],
                operacao: igual ? null : operacao,
                atual: igual ? 0 : 1,
                limparDisplay: !igual,
                valores
            })
        }
    }

    adicionarDigito(digito) {
        if (digito === '.' && this.state.valorDisplay.includes('.')) {
            return 
        }   
        
        const limparDisplay = this.state.valorDisplay === '0' || this.state.limparDisplay
        const valorAtual = limparDisplay ? '' : this.state.valorDisplay 
        const valorDisplay = valorAtual + digito 
        this.setState({ valorDisplay, limparDisplay: false })

        if (digito !== '.') {
            const i = this.state.atual
            const novoValor = parseFloat(valorDisplay)
            const valores = [...this.state.valores]
            valores[i] = novoValor
            this.setState({ valores })
        }
    }
    
    render() {
        return (
            <div className='calculadora'>
                <Display value={this.state.valorDisplay}/>
                <Botao label='AC' click={ this.limparDisplay } triplo/>
                <Botao label='/' click={ this.setOperacao } operacao/>
                <Botao label='7' click={ this.adicionarDigito }/>
                <Botao label='8' click={ this.adicionarDigito }/>
                <Botao label='9' click={ this.adicionarDigito }/>
                <Botao label='*' click={ this.setOperacao } operacao/>
                <Botao label='4' click={ this.adicionarDigito }/>
                <Botao label='5' click={ this.adicionarDigito }/>
                <Botao label='6' click={ this.adicionarDigito }/>
                <Botao label='-' click={ this.setOperacao } operacao/>
                <Botao label='1' click={ this.adicionarDigito }/>
                <Botao label='2' click={ this.adicionarDigito }/>
                <Botao label='3' click={ this.adicionarDigito }/>
                <Botao label='+' click={ this.setOperacao } operacao/>
                <Botao label='0' click={ this.adicionarDigito } duplo/>
                <Botao label='.' click={ this.adicionarDigito }/>
                <Botao label='=' click={ this.setOperacao } operacao/>
            </div>
        )
    }
}