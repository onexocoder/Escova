import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Sparkles,
  Heart,
  Zap,
  Shield,
  Brush,
  Award,
  Check,
  X,
  Package,
  Phone,
  MapPin,
  CreditCard,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

import heroImage from "@assets/generated_images/Hero_product_with_happy_dog_8599daf9.png";
import catDemo from "@assets/generated_images/Cat_grooming_demonstration_closeup_023ae102.png";
import dogDemo from "@assets/generated_images/Dog_grooming_demonstration_photo_b5f9317e.png";
import testimonialCat from "@assets/generated_images/Happy_testimonial_cat_portrait_125cbd4e.png";
import testimonialDog from "@assets/generated_images/Happy_testimonial_dog_portrait_de2c8289.png";
import testimonialBeagle from "@assets/generated_images/Beagle_testimonial_portrait_photo_2600293a.png";
import testimonialPersian from "@assets/generated_images/Persian_cat_testimonial_bd58fc34.png";

export default function Home() {
  const [stockCount] = useState(23);
  const [orderSuccess, setOrderSuccess] = useState(false);
  // 👇 novo: e-mail opcional do cliente (fora do zod)
  const [customerEmail, setCustomerEmail] = useState("");
  const { toast } = useToast();

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      postalCode: "",
      quantity: 1,
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      // continua a salvar a encomenda normalmente
      const response = await apiRequest("POST", "/api/orders", data);
      return response;
    },
    // 👇 AQUI é onde a gente coloca o envio de e-mail
    onSuccess: async () => {
      // pega os valores ANTES de limpar o form
      const orderData = form.getValues();

      // chama o backend de e-mail (o que fizemos no server: /api/encomenda)
      // se o cliente não preencher e-mail, o backend só te manda pra ti
      try {
        await fetch("http://localhost:3000/api/encomenda", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nome: orderData.name,
    telefone: orderData.phone,
    morada: orderData.address,
    codigoPostal: orderData.postalCode,
    quantidade: orderData.quantity,
    emailCliente: customerEmail,
  }),
});

      } catch (err) {
        // não vamos travar o cliente se o e-mail falhar
        console.error("Erro ao enviar email via Resend:", err);
      }

      setOrderSuccess(true);
      form.reset();
      setCustomerEmail("");

      toast({
        title: "Encomenda Confirmada! ✅",
        description: "Receberá a sua PetBrush™ em breve. Pagamento na entrega!",
        duration: 5000,
      });

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1000);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao processar encomenda",
        description:
          error.message || "Por favor, verifique os dados e tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const onSubmit = async (data: InsertOrder) => {
    setOrderSuccess(false);
    createOrderMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ... TODO o resto do teu código fica igual ... */}

      {/* vou pular direto pra parte do FORM onde a gente precisa mudar */}
      <section id="order-form" className="py-16 md:py-20 scroll-mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Finalize a Sua Encomenda
              </h2>
              <p className="text-muted-foreground text-lg">
                Preencha os dados abaixo e receba em casa. Pague apenas quando
                receber!
              </p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 p-4 bg-accent/10 rounded-md border border-accent-border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-accent-foreground" />
                    <div>
                      <p className="font-semibold text-card-foreground">
                        Pague na Entrega
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sem cartão de crédito necessário
                      </p>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* nome */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="João Silva"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* telefone */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="912345678"
                                className="pl-10"
                                {...field}
                                data-testid="input-phone"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* morada */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Morada Completa</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="Rua da Liberdade, 123, 2º Esq"
                                className="pl-10"
                                {...field}
                                data-testid="input-address"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* código postal */}
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código Postal</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1000-001"
                              {...field}
                              data-testid="input-postal-code"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* 👇 CAMPO NOVO: email (fora do zod) */}
                    <div>
                      <FormLabel>
                        E-mail (para receber confirmação){" "}
                        <span className="text-xs text-muted-foreground">
                          (opcional)
                        </span>
                      </FormLabel>
                      <Input
                        type="email"
                        placeholder="email@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                      />
                    </div>

                    {/* quantidade */}
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                            defaultValue={field.value.toString()}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-quantity">
                                <SelectValue placeholder="Selecione a quantidade" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} {num === 1 ? "unidade" : "unidades"} -{" "}
                                  {(19.9 * num).toFixed(2)}€
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {orderSuccess && (
                      <div className="p-6 bg-accent/10 rounded-md border border-accent-border animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-start gap-4">
                          <CheckCircle className="w-8 h-8 text-accent-foreground flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-bold text-lg mb-2 text-card-foreground">
                              Encomenda Confirmada! 🎉
                            </h3>
                            <p className="text-muted-foreground mb-2">
                              Receberá a sua PetBrush™ em 3-5 dias úteis.
                              Lembre-se: paga apenas quando receber!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Entraremos em contato em breve para confirmar os
                              detalhes da entrega.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 space-y-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full text-lg py-6"
                        disabled={createOrderMutation.isPending}
                        data-testid="button-submit-order"
                      >
                        {createOrderMutation.isPending ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            A processar...
                          </>
                        ) : (
                          "Finalizar Encomenda"
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Ao encomendar, concorda com os nossos Termos e
                        Condições e Política de Privacidade
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ... resto do footer igual ... */}
    </div>
  );
}
