import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

export const metadata = {
  title: 'Join as Talent | W. Chloe Creative Hub',
  description: 'Apply to join our roster of creative talents.',
};

export default function JoinPage() {
  const authImage = placeholderImages.placeholderImages.find(p => p.id === 'auth-background');

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 xl:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
           <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl md:text-4xl">Become a W. Chloe Creative</CardTitle>
              <CardDescription className="pt-2">
                If you are a talented artist, actor, model, or creator, we invite you to apply.
                <br />
                Complete the form below to start your journey with us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="e.g., Patricia Wambui" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+254 700 000 000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Primary Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select your creative category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="actress">Actress</SelectItem>
                      <SelectItem value="artist">Artist</SelectItem>
                      <SelectItem value="model">Model</SelectItem>
                      <SelectItem value="content-creator">Content Creator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Your Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself, your work, and your aspirations..." rows={5} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioLink">Link to Portfolio or Social Media</Label>
                  <Input id="portfolioLink" placeholder="e.g., https://instagram.com/yourprofile" />
                  <p className="text-xs text-muted-foreground">Link to your Instagram, Behance, YouTube, or personal website.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demoLinks">Demo Links (Optional)</Label>
                  <Textarea id="demoLinks" placeholder="Links to showreels, performance videos, etc., separated by commas." rows={3} />
                </div>
                
                <Button type="submit" className="w-full" size="lg">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        {authImage && (
          <Image
            src={authImage.imageUrl}
            alt={authImage.description}
            layout="fill"
            className="object-cover dark:brightness-[0.2] dark:grayscale"
            data-ai-hint={authImage.imageHint}
          />
        )}
      </div>
    </div>
  );
}
