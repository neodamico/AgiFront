"use client"

import type React from "react"


import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BankingDashboard } from "@/components/banking-dashboard"

export default function LoginPage() {
  const [gerenteId, setGerenteId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  // Validação simples para demonstração
  if (!gerenteId || !password) {
    setError("Por favor, preencha todos os campos")
    return
  }

  try {
    const response = await axios.post("http://localhost:8080/api/v1/gerentes/login", {
      gerenteId: parseInt(gerenteId), // Converte para número, pois o backend espera Long
      senha: password // Usa "senha" para alinhar com o backend
    })
    setIsLoggedIn(true) // Se sucesso, loga
  } catch (error) {
    setError("ID do gerente ou senha incorretos")
  }
}

  if (isLoggedIn) {
    return <BankingDashboard />
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md banking-terminal shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">SYSAGI</CardTitle>
          </div>
          <p className="text-muted-foreground">Sistema Bancário - Terminal do Gerente</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gerenteId">ID do Gerente</Label>
              <Input
                id="gerenteId"
                type="text"
                value={gerenteId}
                onChange={(e) => setGerenteId(e.target.value)}
                placeholder="Digite seu ID"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="h-12"
              />
            </div>
            {error && <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">{error}</div>}
            <Button type="submit" className="w-full h-12 text-lg">
              Acessar Sistema
            </Button>
          </form>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Credenciais de teste: admin / 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
