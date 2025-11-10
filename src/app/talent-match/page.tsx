'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { talentMatchTool } from '@/ai/flows/talent-match-tool';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  aestheticPreferences: z.string().min(10, {
    message: 'Please describe the desired aesthetic in at least 10 characters.',
  }),
  budget: z.string().min(2, {
    message: 'Please provide a budget.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function TalentMatchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aestheticPreferences: '',
      budget: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await talentMatchTool(data);
      setResult(response.talentSuggestions);
    } catch (error) {
      console.error('AI Talent Match Error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get talent suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Wand2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold">AI Talent Match</h1>
          <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
            Describe your campaign's vibe and budget, and let our AI scout the perfect talent for you.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Find Your Creative Match</CardTitle>
            <CardDescription>
              Provide details about your project to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="aestheticPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aesthetic Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Minimalist, clean, with a touch of retro futurism.' or 'Vibrant, authentic, street style photography.'"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Budget</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., '$5,000 - $10,000' or 'Under $1,000'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Talent...
                    </>
                  ) : (
                    'Generate Suggestions'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {(isLoading || result) && (
          <div className="mt-8">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AI Suggestions
            </h2>
            <Card className="mt-4">
              <CardContent className="p-6">
                {isLoading && (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {result && (
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap font-body">
                    {result}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
