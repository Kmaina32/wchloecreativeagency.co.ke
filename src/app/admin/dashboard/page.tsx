'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, MessageSquareWarning, ArrowUpRight } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import type { Talent, Message } from "@/lib/definitions";
import { collection, query, where, limit } from "firebase/firestore";

export default function Dashboard() {
  const firestore = useFirestore();

  const talentsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'talents') : null, [firestore]);
  const approvedTalentsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'talents'), where('approved', '==', true)) : null, [firestore]);
  const pendingTalentsQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'talents'), where('approved', '==', false)) : null, [firestore]);
  
  const messagesQuery = useMemoFirebase(() => firestore ? collection(firestore, 'messages') : null, [firestore]);
  const unreadMessagesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'messages'), where('read', '==', false)) : null, [firestore]);
  const recentMessagesQuery = useMemoFirebase(() => firestore ? query(collection(firestore, 'messages'), limit(5)) : null, [firestore]);


  const { data: talentsData } = useCollection<Talent>(talentsQuery);
  const { data: pendingApplicationsData } = useCollection<Talent>(pendingTalentsQuery);
  const { data: unreadMessagesData } = useCollection<Message>(unreadMessagesQuery);
  const { data: recentMessages } = useCollection<Message>(recentMessagesQuery);

  const totalTalents = talentsData?.length ?? 0;
  const pendingApplications = pendingApplicationsData?.length ?? 0;
  const unreadMessages = unreadMessagesData?.length ?? 0;

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Talents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTalents}</div>
            <p className="text-xs text-muted-foreground">
              Live count from the database
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              New talent waiting for approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquareWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              New inquiries and booking requests
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                Recent inquiries from clients and fans.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/messages">
                View All
                <ArrowUpRight className="h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentMessages && recentMessages.map(message => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div className="font-medium">{message.name}</div>
                    <div className="text-sm text-muted-foreground">{message.email}</div>
                  </TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={message.read ? "secondary" : "default"}>
                      {message.read ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
