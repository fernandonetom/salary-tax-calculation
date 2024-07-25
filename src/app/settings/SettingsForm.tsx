"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TModel, modelSchema } from "@/data/model";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaveIcon } from "@/components/icons/SaveIcon";
import { AddIcon } from "@/components/icons/AddIcon";
import { RemoveIcon } from "@/components/icons/RemoveIcon";
import { useModelStore } from "@/data/store";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const SettingsForm = () => {
  const { salaries, taxes, setModel } = useModelStore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TModel>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      salaries,
      taxes,
    },
  });

  const salaryFields = useFieldArray({
    name: "salaries",
    control: form.control,
  });

  const taxFields = useFieldArray({
    name: "taxes",
    control: form.control,
  });

  function onSubmit(values: TModel) {
    setModel(values);

    toast({
      title: "Settings saved",
      description: "Now is possible to calculate your taxes",
    });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex items-center justify-center flex-col space-y-10 pb-10"
      >
        <Card className="w-full max-w-7xl">
          <CardHeader>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Salaries</h1>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  salaryFields.append({
                    currency: "BRL",
                    tax: 0,
                    value: 0,
                  });
                }}
              >
                <AddIcon />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-3">
            {salaryFields.fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Salary {index + 1}</h1>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        salaryFields.remove(index);
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`salaries.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="150" {...field} />
                        </FormControl>
                        <FormDescription>Your salary value</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`salaries.${index}.tax`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Percent Tax</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your salary tax in percent
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`salaries.${index}.currency`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(["BRL", "USD"] as const).map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Your salary currency</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card className="w-full max-w-7xl">
          <CardHeader>
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Extra Taxes</h1>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  taxFields.append({
                    name: "",
                    type: "FIXED",
                    value: 0,
                  });
                }}
              >
                <AddIcon />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-3">
            {taxFields.fields.map((field, index) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Tax {index + 1}</h1>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        taxFields.remove(index);
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`taxes.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Government" {...field} />
                        </FormControl>
                        <FormDescription>Your tax name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`taxes.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>Your tax value</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`taxes.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(["FIXED", "PERCENT"] as const).map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Your tax type</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Button className="bg-emerald-500 gap-2" type="submit">
          <SaveIcon /> Save
        </Button>
      </form>
    </Form>
  );
};
