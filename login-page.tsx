"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Imagem lateral e elementos decorativos */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FEF2F4] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFABAB]/30 to-[#D14D72]/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-[#D14D72] mb-6">Center Pet</h1>
            <p className="text-lg text-[#D14D72] mb-8">
              Conectando corações humanos a patinhas que precisam de amor. Encontre seu companheiro perfeito através das
              ONGs parceiras.
            </p>

            {/* Elementos decorativos de animais */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-xl p-4 shadow-md transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-[#FCC8D1] rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">🐶</span>
                </div>
                <h3 className="font-medium text-[#D14D72]">Adote um cão</h3>
                <p className="text-sm text-[#D14D72]/70">Lealdade e amor incondicional</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-[#FCC8D1] rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">🐱</span>
                </div>
                <h3 className="font-medium text-[#D14D72]">Adote um gato</h3>
                <p className="text-sm text-[#D14D72]/70">Companhia e carinho</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-[#FCC8D1] rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">🐰</span>
                </div>
                <h3 className="font-medium text-[#D14D72]">Outros pets</h3>
                <p className="text-sm text-[#D14D72]/70">Descubra novos amigos</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md transform hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-[#FCC8D1] rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="font-medium text-[#D14D72]">Faça a diferença</h3>
                <p className="text-sm text-[#D14D72]/70">Ajude ONGs parceiras</p>
              </div>
            </div>
          </div>
        </div>

        {/* Padrão de patinhas decorativas */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              🐾
            </div>
          ))}
        </div>
      </div>

      {/* Formulários */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-[#FCC8D1] rounded-full flex items-center justify-center">
                <span className="text-4xl">🐾</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#D14D72]">Center Pet</h2>
            <p className="text-[#D14D72]/70 mt-2">
              {isLogin ? "Faça login para continuar" : "Crie sua conta para começar"}
            </p>
          </div>

          <div className="relative">
            {/* Formulário de Login */}
            <div
              className={cn(
                "transition-all duration-500 ease-in-out",
                isLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-100%] absolute inset-0",
              )}
            >
              {isLogin && (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input id="email-login" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-login">Senha</Label>
                    <div className="relative">
                      <Input id="password-login" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Lembrar-me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-[#D14D72] hover:underline">
                      Esqueceu a senha?
                    </a>
                  </div>
                  <Button className="w-full bg-[#D14D72] hover:bg-[#D14D72]/90">Entrar</Button>
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative px-4 bg-white text-sm text-gray-500">ou continue com</div>
                  </div>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Entrar com Google</span>
                  </Button>
                </form>
              )}
            </div>

            {/* Formulário de Cadastro */}
            <div
              className={cn(
                "transition-all duration-500 ease-in-out",
                !isLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%] absolute inset-0",
              )}
            >
              {!isLogin && (
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Nome</Label>
                      <Input id="first-name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Sobrenome</Label>
                      <Input id="last-name" placeholder="Seu sobrenome" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input id="email-register" type="email" placeholder="seu@email.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input id="state" placeholder="Seu estado" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" placeholder="Sua cidade" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-register">Senha</Label>
                    <div className="relative">
                      <Input id="password-register" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Concordo com os{" "}
                      <a href="#" className="text-[#D14D72] hover:underline">
                        Termos de Serviço
                      </a>{" "}
                      e{" "}
                      <a href="#" className="text-[#D14D72] hover:underline">
                        Política de Privacidade
                      </a>
                    </label>
                  </div>
                  <Button className="w-full bg-[#D14D72] hover:bg-[#D14D72]/90">Cadastrar</Button>
                  <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative px-4 bg-white text-sm text-gray-500">ou continue com</div>
                  </div>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Cadastrar com Google</span>
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#D14D72]/70">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button type="button" className="text-[#D14D72] font-medium hover:underline" onClick={toggleForm}>
                {isLogin ? "Cadastre-se" : "Faça login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

