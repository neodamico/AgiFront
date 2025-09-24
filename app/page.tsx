"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BankingDashboard } from "@/components/banking-dashboard"

export default function LoginPage() {
  const [managerId, setManagerId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validação simples para demonstração
    if (!managerId || !password) {
      setError("Por favor, preencha todos os campos")
      return
    }

    if (managerId === "admin" && password === "123456") {
      setIsLoggedIn(true)
    } else {
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
              <Label htmlFor="managerId">ID do Gerente</Label>
              <Input
                id="managerId"
                type="text"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
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
