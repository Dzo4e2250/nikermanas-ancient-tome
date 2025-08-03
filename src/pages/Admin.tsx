import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AncientTitle from "@/components/AncientTitle";
import { User, Session } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
}

interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  booking_date: string;
  booking_time: string;
  status: string;
  therapist_name: string;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (!session?.user) {
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id);

      const hasAdminRole = roles?.some(role => role.role === 'admin');
      setIsAdmin(hasAdminRole || false);

      if (!hasAdminRole) {
        toast.error("Nimate pravic za dostop do admin vmesnika");
        navigate("/");
        return;
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles();
      fetchBookings();
    }
  }, [isAdmin]);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        user_roles!inner(role)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Napaka pri nalaganju profilov");
      return;
    }
    setProfiles(data || []);
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Napaka pri nalaganju rezervacij");
      return;
    }
    setBookings(data || []);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      toast.error("Napaka pri posodabljanju statusa");
      return;
    }

    toast.success("Status posodobljen");
    fetchBookings();
  };

  const promoteToAdmin = async (userId: string) => {
    const { error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role: 'admin' });

    if (error) {
      toast.error("Napaka pri dodeljevanju admin vloge");
      return;
    }

    toast.success("Uporabnik je postal administrator");
    fetchProfiles();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center">
        <div>Nalagam...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <AncientTitle level={1}>Administrativni vmesnik</AncientTitle>
          <div className="space-x-2">
            <span className="text-sm text-muted-foreground">
              Pozdravljeni, {user?.user_metadata?.display_name || user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              Odjava
            </Button>
          </div>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Rezervacije</TabsTrigger>
            <TabsTrigger value="users">Uporabniki</TabsTrigger>
            <TabsTrigger value="settings">Nastavitve</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rezervacije terapij</CardTitle>
                <CardDescription>
                  Pregled in upravljanje vseh rezervacij
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Klient</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Ura</TableHead>
                      <TableHead>Terapevt</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Akcije</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.client_name}</TableCell>
                        <TableCell>{booking.client_email}</TableCell>
                        <TableCell>{booking.booking_date}</TableCell>
                        <TableCell>{booking.booking_time}</TableCell>
                        <TableCell>{booking.therapist_name}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              disabled={booking.status === 'confirmed'}
                            >
                              Potrdi
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                              disabled={booking.status === 'cancelled'}
                            >
                              Prekliči
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upravljanje uporabnikov</CardTitle>
                <CardDescription>
                  Pregled uporabnikov in dodeljevanje vlog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ime</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Vloga</TableHead>
                      <TableHead>Registriran</TableHead>
                      <TableHead>Akcije</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.map((profile: any) => (
                      <TableRow key={profile.id}>
                        <TableCell>{profile.display_name}</TableCell>
                        <TableCell className="font-mono text-xs">{profile.user_id}</TableCell>
                        <TableCell>
                          <Badge variant={profile.user_roles?.role === 'admin' ? 'default' : 'secondary'}>
                            {profile.user_roles?.role || 'user'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(profile.created_at).toLocaleDateString('sl-SI')}</TableCell>
                        <TableCell>
                          {profile.user_roles?.role !== 'admin' && (
                            <Button 
                              size="sm"
                              onClick={() => promoteToAdmin(profile.user_id)}
                            >
                              Naredi admin
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sistemske nastavitve</CardTitle>
                <CardDescription>
                  Upravljanje spletne strani in storitev
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => navigate("/admin/service-images")}>
                  Upravljaj slike storitev
                </Button>
                <p className="text-sm text-muted-foreground">
                  Dodatne nastavitve bodo dodane v prihodnosti.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;