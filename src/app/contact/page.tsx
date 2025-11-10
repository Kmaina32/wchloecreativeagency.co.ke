import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: 'Contact Us | W. Chloe Creative Hub',
  description: 'Get in touch for collaborations, bookings, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
       <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h1>
        <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
          We'd love to hear from you. Whether it's a booking inquiry, a partnership proposal, or just a hello.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
            <h2 className="font-headline text-2xl font-semibold">Contact Information</h2>
            <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-foreground">Our Office</p>
                        <p>123 Creative Lane, Nairobi, Kenya</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-foreground">Email Us</p>
                        <a href="mailto:hello@wcta.africa" className="hover:text-primary">hello@wcta.africa</a>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-foreground">Call Us</p>
                        <p>+254 20 123 4567</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Booking Inquiry" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your project..." rows={6} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
