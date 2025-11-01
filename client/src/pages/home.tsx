import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Heart, Zap, Shield, Brush, Award, Check, X, Package, Phone, MapPin, CreditCard, Loader2, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

import heroImage from "@assets/generated_images/Hero_product_with_happy_dog_8599daf9.png";
import catDemo from "@assets/generated_images/Cat_grooming_demonstration_closeup_023ae102.png";
import dogDemo from "@assets/generated_images/Dog_grooming_demonstration_photo_b5f9317e.png";
import testimonialCat from "@assets/generated_images/Happy_testimonial_cat_portrait_125cbd4e.png";
import testimonialDog from "@assets/generated_images/Happy_testimonial_dog_portrait_de2c8289.png";
import testimonialBeagle from "@assets/generated_images/Beagle_testimonial_portrait_photo_2600293a.png";
import testimonialPersian from "@assets/generated_images/Persian_cat_testimonial_portrait_bd58fc34.png";

export default function Home() {
  const [stockCount] = useState(23);
  const [orderSuccess, setOrderSuccess] = useState(false);
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
      const response = await apiRequest("POST", "/api/orders", data);
      return response;
    },
    onSuccess: () => {
      setOrderSuccess(true);
      form.reset();
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
        description: error.message || "Por favor, verifique os dados e tente novamente.",
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
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="PetBrush em uso com cão feliz"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <Badge className="bg-accent/90 backdrop-blur-sm text-accent-foreground border-accent-border hover:bg-accent text-base px-4 py-2">
              <CreditCard className="w-4 h-4 mr-2" />
              Pague Só Quando Receber
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              A Escova 3 em 1 que o seu Pet Vai Amar ❤️
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Remove pelos, massageia e substitui os banhos — tudo numa só escova!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                variant="default"
                className="text-lg px-8 py-6 bg-primary/95 backdrop-blur-sm hover:bg-primary border-primary-border"
                onClick={() => document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-hero-cta"
              >
                Encomendar Agora – Pague Só Quando Receber
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Garantia 30 Dias</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Envio Grátis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-card-foreground">
            Por Que os Donos de Pets Adoram a PetBrush™
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover-elevate" data-testid="card-benefit-1">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Brush className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Remove Pelos Soltos
                </h3>
                <p className="text-muted-foreground">
                  Elimina até 95% dos pelos soltos e evita bolas de pelo. A sua casa fica limpa e o seu pet mais saudável.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-benefit-2">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-accent/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Massagem Relaxante
                </h3>
                <p className="text-muted-foreground">
                  Cerdas de silicone macias que massageiam a pele, melhoram a circulação e deixam o seu pet completamente relaxado.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-benefit-3">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Ideal para Todos os Pets
                </h3>
                <p className="text-muted-foreground">
                  Perfeita para cães e gatos de qualquer tamanho ou raça. Funciona em pelo curto, médio ou longo.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-benefit-4">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-accent/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Reduz Banhos Frequentes
                </h3>
                <p className="text-muted-foreground">
                  Limpa profundamente e remove odores, reduzindo a necessidade de banhos frequentes e visitas ao veterinário.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-benefit-5">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Design Ergonómico
                </h3>
                <p className="text-muted-foreground">
                  Cabo antiderrapante e fácil de segurar. Limpeza simples: basta retirar os pelos com um clique!
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate bg-accent/10 border-accent-border" data-testid="card-benefit-cod">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-md bg-accent flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  Pague na Entrega
                </h3>
                <p className="text-muted-foreground">
                  Sem risco! Recebe primeiro, paga depois. Total segurança e confiança na sua compra.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Veja a PetBrush™ em Ação
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Milhares de pets em Portugal já adoram a sua escova 3 em 1
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden hover-elevate" data-testid="card-demo-dog">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={dogDemo}
                  alt="PetBrush em uso com cão"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">Remove Pelos Soltos</h3>
                <p className="text-muted-foreground">
                  As cerdas de silicone capturam eficazmente os pelos mortos, deixando a pelagem brilhante e saudável.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover-elevate" data-testid="card-demo-cat">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src={catDemo}
                  alt="PetBrush em uso com gato"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-2">Massagem Relaxante</h3>
                <p className="text-muted-foreground">
                  A textura macia proporciona uma massagem suave que os gatos e cães adoram, promovendo relaxamento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            O Que Dizem os Nossos Clientes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover-elevate" data-testid="card-testimonial-1">
              <CardContent className="p-6 space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonialCat}
                    alt="Gata feliz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-center italic">
                  "A minha gata adora! Quase dorme enquanto escovo 😻"
                </p>
                <p className="text-sm font-semibold text-center text-card-foreground">
                  Ana Ribeiro, Lisboa
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-testimonial-2">
              <CardContent className="p-6 space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonialDog}
                    alt="Cão feliz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-center italic">
                  "O meu cão já não solta pelo pela casa toda!"
                </p>
                <p className="text-sm font-semibold text-center text-card-foreground">
                  Miguel Tavares, Porto
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-testimonial-3">
              <CardContent className="p-6 space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonialBeagle}
                    alt="Beagle feliz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-center italic">
                  "Melhor compra do ano! O Rex fica super calmo 🐶"
                </p>
                <p className="text-sm font-semibold text-center text-card-foreground">
                  Sofia Costa, Braga
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-testimonial-4">
              <CardContent className="p-6 space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto">
                  <img
                    src={testimonialPersian}
                    alt="Gato persa feliz"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-muted-foreground text-center italic">
                  "Essencial para pelo comprido. Recomendo muito!"
                </p>
                <p className="text-sm font-semibold text-center text-card-foreground">
                  Carlos Ferreira, Coimbra
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por Que Escolher a PetBrush™?
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4 font-semibold">Características</th>
                        <th className="text-center py-4 px-4 font-semibold text-primary">PetBrush™</th>
                        <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Escovas Comuns</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-4 px-4">Remove pelos soltos</td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-primary mx-auto" data-testid="check-feature-1" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">Massagem relaxante</td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-primary mx-auto" data-testid="check-feature-2" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <X className="w-6 h-6 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">Limpeza profunda</td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-primary mx-auto" data-testid="check-feature-3" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <X className="w-6 h-6 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">Design ergonómico</td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-primary mx-auto" data-testid="check-feature-4" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <X className="w-6 h-6 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4">Fácil de limpar</td>
                        <td className="text-center py-4 px-4">
                          <Check className="w-6 h-6 text-primary mx-auto" data-testid="check-feature-5" />
                        </td>
                        <td className="text-center py-4 px-4">
                          <X className="w-6 h-6 text-muted-foreground mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 p-6 bg-accent/10 rounded-md border border-accent-border">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-accent-foreground flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-card-foreground">
                        Satisfação Garantida ou Dinheiro de Volta
                      </h3>
                      <p className="text-muted-foreground">
                        Tem 30 dias para experimentar a PetBrush™. Se não ficar completamente satisfeito, devolvemos o seu dinheiro. Sem perguntas!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge className="bg-destructive text-destructive-foreground border-destructive-border text-base px-4 py-2">
              Oferta Limitada
            </Badge>

            <h2 className="text-3xl md:text-5xl font-bold">
              Aproveite Esta Oferta Exclusiva!
            </h2>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-3xl md:text-4xl text-muted-foreground line-through">
                39,90€
              </span>
              <span className="text-5xl md:text-6xl font-bold text-primary">
                19,90€
              </span>
            </div>

            <Badge variant="outline" className="text-base px-4 py-2 border-destructive text-destructive-foreground" data-testid="badge-stock-counter">
              <Package className="w-4 h-4 mr-2" />
              Restam apenas {stockCount} unidades!
            </Badge>

            <div className="space-y-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="button-pricing-cta"
              >
                Encomendar Agora – Pague Só Quando Receber 🐾
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Pagamento 100% seguro na entrega</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="order-form" className="py-16 md:py-20 scroll-mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Finalize a Sua Encomenda
              </h2>
              <p className="text-muted-foreground text-lg">
                Preencha os dados abaixo e receba em casa. Pague apenas quando receber!
              </p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="mb-6 p-4 bg-accent/10 rounded-md border border-accent-border">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-accent-foreground" />
                    <div>
                      <p className="font-semibold text-card-foreground">Pague na Entrega</p>
                      <p className="text-sm text-muted-foreground">Sem cartão de crédito necessário</p>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade</FormLabel>
                          <Select
                            onValueChange={(value) => field.onChange(parseInt(value))}
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
                                  {num} {num === 1 ? "unidade" : "unidades"} - {(19.90 * num).toFixed(2)}€
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
                              Receberá a sua PetBrush™ em 3-5 dias úteis. Lembre-se: paga apenas quando receber!
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Entraremos em contato em breve para confirmar os detalhes da entrega.
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
                        Ao encomendar, concorda com os nossos Termos e Condições e Política de Privacidade
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-4 text-card-foreground">PetBrush™</h3>
                <p className="text-sm text-muted-foreground">
                  A escova 3 em 1 que o seu pet vai amar. Qualidade premium para o bem-estar do seu animal.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-card-foreground">Links Úteis</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Política de Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Termos e Condições
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      Política de Devolução
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-card-foreground">Contacto</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Email: suporte@petbrush.pt</li>
                  <li>Telefone: +351 21 123 4567</li>
                  <li>Horário: Seg-Sex, 9h-18h</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t text-center text-sm text-muted-foreground">
              <p>© 2025 PetBrush™. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
