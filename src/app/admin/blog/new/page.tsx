'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const blogPostSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  author: z.string().min(2, { message: "Author name is required." }),
  tags: z.string().min(2, { message: "Please add at least one tag." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
});

type BlogPostFormValues = z.infer<typeof blogPostSchema>;

export default function NewBlogPostPage() {
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<BlogPostFormValues>({
        resolver: zodResolver(blogPostSchema),
    });

    const onSubmit: SubmitHandler<BlogPostFormValues> = (data) => {
        console.log(data);
        toast({
            title: "Blog Post Published",
            description: `"${data.title}" has been successfully published.`,
        });
    };

  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <div>
            <h2 className="text-2xl font-bold tracking-tight">Create New Blog Post</h2>
            <p className="text-muted-foreground">
                Write and publish a new article for your audience.
            </p>
            </div>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Post Details</CardTitle>
                <CardDescription>Fill in the content for your new blog post.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Post Title</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" {...register("author")} />
                             {errors.author && <p className="text-destructive text-sm">{errors.author.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input id="tags" placeholder="e.g. Africa, Art, Fashion" {...register("tags")} />
                            <p className="text-xs text-muted-foreground">Separate tags with a comma.</p>
                             {errors.tags && <p className="text-destructive text-sm">{errors.tags.message}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" rows={15} placeholder="Write your blog post here. You can use Markdown for formatting." {...register("content")} />
                        {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
                    </div>
                    
                    <div className="flex justify-end">
                        <Button type="submit">Publish Post</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
