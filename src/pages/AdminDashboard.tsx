import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AncientTitle from "@/components/AncientTitle";
import { User, Session } from "@supabase/supabase-js";
import { Calendar, Users, Settings, FileImage, Plus, Eye, BarChart3 } from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
    totalServices: 4
  });
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

      await loadStats();
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

  const loadStats = async () => {
    try {
      // Get booking stats
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status');
      
      const { data: users } = await supabase
        .from('profiles')
        .select('id');

      setStats({
        totalBookings: bookings?.length || 0,
        pendingBookings: bookings?.filter(b => b.status === 'pending').length || 0,
        totalUsers: users?.length || 0,
        totalServices: 4
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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

  const adminCards = [
    {
      title: "Pregled rezervacij",
      description: "Upravljanje in potrjevanje rezervacij",
      icon: Calendar,
      stats: `${stats.pendingBookings} čakajočih od ${stats.totalBookings} skupaj`,
      action: () => navigate("/admin/bookings"),
      color: "text-blue-600"
    },
    {
      title: "Upravljanje uporabnikov",
      description: "Pregled uporabnikov in dodeljevanje vlog",
      icon: Users,
      stats: `${stats.totalUsers} registriranih uporabnikov`,
      action: () => navigate("/admin/users"),
      color: "text-green-600"
    },
    {
      title: "Dodaj dogodek",
      description: "Ustvari nove terapevtske dogodke",
      icon: Plus,
      stats: "Novi dogodki in termini",
      action: () => navigate("/admin/events"),
      color: "text-purple-600"
    },
    {
      title: "Slike storitev",
      description: "Upravljanje slik za storitve",
      icon: FileImage,
      stats: `${stats.totalServices} storitev`,
      action: () => navigate("/admin/service-images"),
      color: "text-orange-600"
    },
    {
      title: "Statistike",
      description: "Pregled obiskov in analitika",
      icon: BarChart3,
      stats: "Podrobne analize",
      action: () => navigate("/admin/analytics"),
      color: "text-indigo-600"
    },
    {
      title: "Sistemske nastavitve",
      description: "Splošne nastavitve sistema",
      icon: Settings,
      stats: "Konfiguracija",
      action: () => navigate("/admin/settings"),
      color: "text-gray-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <AncientTitle level={1}>Admin nadzorna plošča</AncientTitle>
            <p className="text-muted-foreground font-ancient">
              Dobrodošli, {user?.user_metadata?.display_name || user?.email}
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => navigate("/")}>
              Na domačo stran
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              Odjava
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skupaj rezervacij</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Čakajoče rezervacije</p>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
                <Badge variant="secondary" className="text-orange-600">Čakajoče</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registrirani uporabniki</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aktivne storitve</p>
                  <p className="text-2xl font-bold">{stats.totalServices}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={card.action}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-background rounded-lg">
                      <IconComponent className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {card.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3">
                    {card.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {card.stats}
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Odpri →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;