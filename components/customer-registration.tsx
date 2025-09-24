"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { User, MapPin, Phone, Briefcase } from "lucide-react"

export function CustomerRegistration() {
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    sexo: "",
    tipoDocumento: "",
    numeroDocumento: "",
    cpf: "",
    nomeSocial: "",
    nomePai: "",
    nomeMae: "",
    email: "",
    estadoCivil: "",
    nomeConjuge: "",
    dataNascConjuge: "",
    cpfConjuge: "",

    // Dados profissionais
    profissao: "",
    empresaAtual: "",
    cargo: "",
    salarioMensal: "",
    tempoEmprego: "",
    patrimonioEstimado: "",
    restricoesBancarias: false,
    ppe: false,

    // Endereço
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    tipoEndereco: "",

    // Telefone
    ddd: "",
    numeroTelefone: "",
    tipoTelefone: "",
  })

  const [cpfValid, setCpfValid] = useState<boolean | null>(null)

  const validateCPF = (cpf: string) => {
    // Validação básica de CPF (implementação simplificada)
    const cleanCPF = cpf.replace(/\D/g, "")
    if (cleanCPF.length !== 11) return false

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false

    return true // Implementação simplificada
  }

  const handleCPFChange = (value: string) => {
    setFormData({ ...formData, cpf: value })
    if (value.length >= 11) {
      setCpfValid(validateCPF(value))
    } else {
      setCpfValid(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cpfValid) {
      alert("CPF inválido. Não é possível finalizar o cadastro.")
      return
    }
    alert("Cliente cadastrado com sucesso!")
    // Reset form
    setFormData({
      nome: "",
      sobrenome: "",
      dataNascimento: "",
      sexo: "",
      tipoDocumento: "",
      numeroDocumento: "",
      cpf: "",
      nomeSocial: "",
      nomePai: "",
      nomeMae: "",
      email: "",
      estadoCivil: "",
      nomeConjuge: "",
      dataNascConjuge: "",
      cpfConjuge: "",
      profissao: "",
      empresaAtual: "",
      cargo: "",
      salarioMensal: "",
      tempoEmprego: "",
      patrimonioEstimado: "",
      restricoesBancarias: false,
      ppe: false,
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      cidade: "",
      estado: "",
      tipoEndereco: "",
      ddd: "",
      numeroTelefone: "",
      tipoTelefone: "",
    })
    setCpfValid(null)
  }

  return (
    <div className="space-y-6">
      <Card className="banking-terminal">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <User className="w-5 h-5" />
            <span>Cadastro de Cliente</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="form-section p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-primary">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sobrenome">Sobrenome *</Label>
                  <Input
                    id="sobrenome"
                    value={formData.sobrenome}
                    onChange={(e) => setFormData({ ...formData, sobrenome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sexo">Sexo *</Label>
                  <Select value={formData.sexo} onValueChange={(value) => setFormData({ ...formData, sexo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                  <Select
                    value={formData.tipoDocumento}
                    onValueChange={(value) => setFormData({ ...formData, tipoDocumento: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rg">RG</SelectItem>
                      <SelectItem value="cnh">CNH</SelectItem>
                      <SelectItem value="passaporte">Passaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="numeroDocumento">Número do Documento *</Label>
                  <Input
                    id="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    placeholder="000.000.000-00"
                    className={cpfValid === false ? "border-destructive" : cpfValid === true ? "border-success" : ""}
                    required
                  />
                  {cpfValid === false && <p className="text-destructive text-sm mt-1">CPF inválido</p>}
                  {cpfValid === true && <p className="text-success text-sm mt-1">CPF válido</p>}
                </div>
                <div>
                  <Label htmlFor="nomeSocial">Nome Social</Label>
                  <Input
                    id="nomeSocial"
                    value={formData.nomeSocial}
                    onChange={(e) => setFormData({ ...formData, nomeSocial: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nomePai">Nome do Pai</Label>
                  <Input
                    id="nomePai"
                    value={formData.nomePai}
                    onChange={(e) => setFormData({ ...formData, nomePai: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="nomeMae">Nome da Mãe *</Label>
                  <Input
                    id="nomeMae"
                    value={formData.nomeMae}
                    onChange={(e) => setFormData({ ...formData, nomeMae: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estadoCivil">Estado Civil *</Label>
                  <Select
                    value={formData.estadoCivil}
                    onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="uniao-estavel">União Estável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(formData.estadoCivil === "casado" || formData.estadoCivil === "uniao-estavel") && (
                  <>
                    <div>
                      <Label htmlFor="nomeConjuge">Nome do Cônjuge</Label>
                      <Input
                        id="nomeConjuge"
                        value={formData.nomeConjuge}
                        onChange={(e) => setFormData({ ...formData, nomeConjuge: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dataNascConjuge">Data Nasc. Cônjuge</Label>
                      <Input
                        id="dataNascConjuge"
                        type="date"
                        value={formData.dataNascConjuge}
                        onChange={(e) => setFormData({ ...formData, dataNascConjuge: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpfConjuge">CPF do Cônjuge</Label>
                      <Input
                        id="cpfConjuge"
                        value={formData.cpfConjuge}
                        onChange={(e) => setFormData({ ...formData, cpfConjuge: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Dados Profissionais */}
            <div className="form-section p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-primary flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Dados Profissionais</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="profissao">Profissão *</Label>
                  <Input
                    id="profissao"
                    value={formData.profissao}
                    onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="empresaAtual">Empresa Atual *</Label>
                  <Input
                    id="empresaAtual"
                    value={formData.empresaAtual}
                    onChange={(e) => setFormData({ ...formData, empresaAtual: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="salarioMensal">Salário Mensal *</Label>
                  <Input
                    id="salarioMensal"
                    type="number"
                    value={formData.salarioMensal}
                    onChange={(e) => setFormData({ ...formData, salarioMensal: e.target.value })}
                    placeholder="R$ 0,00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tempoEmprego">Tempo de Emprego (meses) *</Label>
                  <Input
                    id="tempoEmprego"
                    type="number"
                    value={formData.tempoEmprego}
                    onChange={(e) => setFormData({ ...formData, tempoEmprego: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="patrimonioEstimado">Patrimônio Estimado</Label>
                  <Input
                    id="patrimonioEstimado"
                    type="number"
                    value={formData.patrimonioEstimado}
                    onChange={(e) => setFormData({ ...formData, patrimonioEstimado: e.target.value })}
                    placeholder="R$ 0,00"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="restricoesBancarias"
                    checked={formData.restricoesBancarias}
                    onCheckedChange={(checked) => setFormData({ ...formData, restricoesBancarias: checked as boolean })}
                  />
                  <Label htmlFor="restricoesBancarias">Possui restrições bancárias?</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ppe"
                    checked={formData.ppe}
                    onCheckedChange={(checked) => setFormData({ ...formData, ppe: checked as boolean })}
                  />
                  <Label htmlFor="ppe">É pessoa politicamente exposta (PPE)?</Label>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="form-section p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-primary flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Endereço</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                    placeholder="00000-000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="logradouro">Logradouro *</Label>
                  <Input
                    id="logradouro"
                    value={formData.logradouro}
                    onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado *</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AC">Acre</SelectItem>
                      <SelectItem value="AL">Alagoas</SelectItem>
                      <SelectItem value="AP">Amapá</SelectItem>
                      <SelectItem value="AM">Amazonas</SelectItem>
                      <SelectItem value="BA">Bahia</SelectItem>
                      <SelectItem value="CE">Ceará</SelectItem>
                      <SelectItem value="DF">Distrito Federal</SelectItem>
                      <SelectItem value="ES">Espírito Santo</SelectItem>
                      <SelectItem value="GO">Goiás</SelectItem>
                      <SelectItem value="MA">Maranhão</SelectItem>
                      <SelectItem value="MT">Mato Grosso</SelectItem>
                      <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="PA">Pará</SelectItem>
                      <SelectItem value="PB">Paraíba</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="PE">Pernambuco</SelectItem>
                      <SelectItem value="PI">Piauí</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="RO">Rondônia</SelectItem>
                      <SelectItem value="RR">Roraima</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="SE">Sergipe</SelectItem>
                      <SelectItem value="TO">Tocantins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tipoEndereco">Tipo de Endereço *</Label>
                  <Select
                    value={formData.tipoEndereco}
                    onValueChange={(value) => setFormData({ ...formData, tipoEndereco: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proprio">Próprio</SelectItem>
                      <SelectItem value="alugado">Alugado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Telefone */}
            <div className="form-section p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-primary flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Telefone</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ddd">DDD *</Label>
                  <Input
                    id="ddd"
                    value={formData.ddd}
                    onChange={(e) => setFormData({ ...formData, ddd: e.target.value })}
                    placeholder="11"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numeroTelefone">Número *</Label>
                  <Input
                    id="numeroTelefone"
                    value={formData.numeroTelefone}
                    onChange={(e) => setFormData({ ...formData, numeroTelefone: e.target.value })}
                    placeholder="99999-9999"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tipoTelefone">Tipo *</Label>
                  <Select
                    value={formData.tipoTelefone}
                    onValueChange={(value) => setFormData({ ...formData, tipoTelefone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celular">Celular</SelectItem>
                      <SelectItem value="fixo">Fixo</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => window.location.reload()}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Cadastrar Cliente
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
