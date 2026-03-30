import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Menu,
  X,
  Settings,
  TrendingUp,
  Book,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Demo data
const demoMyths = [
  { id: "1", title: "Eating rice at night causes weight gain", status: "debunked", category: "Health", views: 12500, date: "2025-01-02" },
  { id: "2", title: "Black cats bring bad luck", status: "debunked", category: "Cultural", views: 8900, date: "2025-01-01" },
  { id: "3", title: "Green tea boosts metabolism significantly", status: "partial", category: "Health", views: 6200, date: "2024-12-28" },
  { id: "4", title: "Full moon affects human behavior", status: "partial", category: "Social", views: 4800, date: "2024-12-25" },
  { id: "5", title: "Drinking milk with fish causes skin diseases", status: "debunked", category: "Health", views: 7600, date: "2024-12-20" },
];

const demoComments = [
  { id: "1", user: "Ahmed Khan", content: "Very informative article!", mythId: "1", date: "2025-01-03", status: "approved" },
  { id: "2", user: "Fatima Zahra", content: "I always believed this myth!", mythId: "2", date: "2025-01-02", status: "pending" },
  { id: "3", user: "Usman Ali", content: "Can you provide more sources?", mythId: "1", date: "2025-01-01", status: "approved" },
  { id: "4", user: "Ayesha Siddiqui", content: "This is not true in my experience", mythId: "3", date: "2024-12-30", status: "pending" },
];

const demoUsers = [
  { id: "1", name: "Ahmed Khan", email: "ahmed@example.com", role: "user", joinDate: "2024-12-01" },
  { id: "2", name: "Fatima Zahra", email: "fatima@example.com", role: "user", joinDate: "2024-11-15" },
  { id: "3", name: "Usman Ali", email: "usman@example.com", role: "moderator", joinDate: "2024-10-20" },
  { id: "4", name: "Ayesha Siddiqui", email: "ayesha@example.com", role: "user", joinDate: "2024-09-10" },
];

const demoStories = [
  { id: "1", title: "The Legend of Peer Channan", author: "Ahmed Khan", category: "Folklore", status: "published", date: "2025-01-05", likes: 245 },
  { id: "2", title: "The Churail of Old Lahore", author: "Fatima Zahra", category: "Supernatural", status: "published", date: "2025-01-03", likes: 189 },
  { id: "3", title: "The Flying Horse of Quaid", author: "Usman Ali", category: "Urban Legends", status: "published", date: "2024-12-28", likes: 156 },
  { id: "4", title: "The Haunted Well of Multan", author: "Ali Hassan", category: "Supernatural", status: "pending", date: "2025-01-06", likes: 0 },
  { id: "5", title: "Tales from the Margalla Hills", author: "Sara Malik", category: "Folklore", status: "pending", date: "2025-01-07", likes: 0 },
];

type TabType = "dashboard" | "myths" | "stories" | "comments" | "users";

const statusConfig = {
  verified: { icon: CheckCircle, label: "Verified", color: "text-verified", bg: "bg-verified/10" },
  debunked: { icon: XCircle, label: "Debunked", color: "text-debunked", bg: "bg-debunked/10" },
  partial: { icon: AlertTriangle, label: "Partial", color: "text-partial", bg: "bg-partial/10" },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [myths, setMyths] = useState(demoMyths);
  const [comments, setComments] = useState(demoComments);
  const [users] = useState(demoUsers);
  const [stories, setStories] = useState(demoStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMythModal, setShowMythModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [editingMyth, setEditingMyth] = useState<typeof demoMyths[0] | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin");
  };

  const handleDeleteMyth = (id: string) => {
    setMyths(myths.filter((m) => m.id !== id));
    toast({
      title: "Myth deleted",
      description: "The myth has been removed successfully.",
    });
  };

  const handleApproveComment = (id: string) => {
    setComments(comments.map((c) => (c.id === id ? { ...c, status: "approved" } : c)));
    toast({
      title: "Comment approved",
      description: "The comment is now visible.",
    });
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
    toast({
      title: "Comment deleted",
      description: "The comment has been removed.",
    });
  };

  const handlePublishStory = (id: string) => {
    setStories(stories.map((s) => (s.id === id ? { ...s, status: "published" } : s)));
    toast({
      title: "Story published",
      description: "The story is now visible to users.",
    });
  };

  const handleDeleteStory = (id: string) => {
    setStories(stories.filter((s) => s.id !== id));
    toast({
      title: "Story deleted",
      description: "The story has been removed.",
    });
  };

  const navItems = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutDashboard },
    { id: "myths" as TabType, label: "Manage Myths", icon: BookOpen },
    { id: "stories" as TabType, label: "Stories", icon: Book },
    { id: "comments" as TabType, label: "Comments", icon: MessageSquare },
    { id: "users" as TabType, label: "Users", icon: Users },
  ];

  const stats = [
    { label: "Total Myths", value: myths.length, icon: BookOpen, color: "bg-primary" },
    { label: "Published Stories", value: stories.filter((s) => s.status === "published").length, icon: Book, color: "bg-secondary" },
    { label: "Pending Comments", value: comments.filter((c) => c.status === "pending").length, icon: MessageSquare, color: "bg-partial" },
    { label: "Total Users", value: users.length, icon: Users, color: "bg-emerald-light" },
  ];

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold">M</span>
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">Myth Guider</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Settings className="w-5 h-5" />
              View Site
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-display text-xl lg:text-2xl font-bold text-foreground capitalize">
                {activeTab === "dashboard" ? "Dashboard Overview" : activeTab}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {activeTab === "myths" && (
                <Button onClick={() => setShowMythModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Myth
                </Button>
              )}
              {activeTab === "stories" && (
                <Button onClick={() => setShowStoryModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Story
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Myths */}
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Myths</h3>
                  <div className="space-y-3">
                    {myths.slice(0, 4).map((myth) => {
                      const StatusIcon = statusConfig[myth.status as keyof typeof statusConfig].icon;
                      return (
                        <div key={myth.id} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                          <div className="flex items-center gap-3 min-w-0">
                            <StatusIcon className={`w-5 h-5 flex-shrink-0 ${statusConfig[myth.status as keyof typeof statusConfig].color}`} />
                            <span className="text-sm text-foreground truncate">{myth.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{myth.views} views</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pending Comments */}
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">Pending Comments</h3>
                  <div className="space-y-3">
                    {comments.filter((c) => c.status === "pending").slice(0, 4).map((comment) => (
                      <div key={comment.id} className="p-3 bg-muted rounded-xl">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground">{comment.user}</p>
                            <p className="text-xs text-muted-foreground truncate">{comment.content}</p>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleApproveComment(comment.id)}
                              className="p-1.5 hover:bg-verified/20 rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-4 h-4 text-verified" />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="p-1.5 hover:bg-destructive/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {comments.filter((c) => c.status === "pending").length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No pending comments</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Myths Tab */}
          {activeTab === "myths" && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search myths..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              {/* Myths Table */}
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Title</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Category</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Views</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date</th>
                        <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myths
                        .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((myth) => {
                          const StatusIcon = statusConfig[myth.status as keyof typeof statusConfig].icon;
                          return (
                            <tr key={myth.id} className="border-t border-border hover:bg-muted/50">
                              <td className="px-6 py-4">
                                <span className="text-sm text-foreground">{myth.title}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusConfig[myth.status as keyof typeof statusConfig].bg}`}>
                                  <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[myth.status as keyof typeof statusConfig].color}`} />
                                  <span className={`text-xs font-medium ${statusConfig[myth.status as keyof typeof statusConfig].color}`}>
                                    {statusConfig[myth.status as keyof typeof statusConfig].label}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-muted-foreground">{myth.category}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-muted-foreground">{myth.views.toLocaleString()}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-muted-foreground">{myth.date}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                  </button>
                                  <button
                                    onClick={() => setEditingMyth(myth)}
                                    className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                                  >
                                    <Edit className="w-4 h-4 text-primary" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMyth(myth.id)}
                                    className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Stories Tab */}
          {activeTab === "stories" && (
            <div className="space-y-6">
              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              {/* Stories Table */}
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Title</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Author</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Category</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date</th>
                        <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stories
                        .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.author.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((story) => (
                          <tr key={story.id} className="border-t border-border hover:bg-muted/50">
                            <td className="px-6 py-4">
                              <span className="text-sm text-foreground">{story.title}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-muted-foreground">{story.author}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-muted-foreground">{story.category}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                story.status === "published"
                                  ? "bg-verified/10 text-verified"
                                  : "bg-partial/10 text-partial"
                              }`}>
                                {story.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-muted-foreground">{story.date}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {story.status === "pending" && (
                                  <button
                                    onClick={() => handlePublishStory(story.id)}
                                    className="p-2 hover:bg-verified/10 rounded-lg transition-colors"
                                    title="Publish story"
                                  >
                                    <CheckCircle className="w-4 h-4 text-verified" />
                                  </button>
                                )}
                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-muted-foreground" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStory(story.id)}
                                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">User</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Comment</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Status</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Date</th>
                        <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments.map((comment) => (
                        <tr key={comment.id} className="border-t border-border hover:bg-muted/50">
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-foreground">{comment.user}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-muted-foreground">{comment.content}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              comment.status === "approved"
                                ? "bg-verified/10 text-verified"
                                : "bg-partial/10 text-partial"
                            }`}>
                              {comment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-muted-foreground">{comment.date}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {comment.status === "pending" && (
                                <button
                                  onClick={() => handleApproveComment(comment.id)}
                                  className="p-2 hover:bg-verified/10 rounded-lg transition-colors"
                                >
                                  <CheckCircle className="w-4 h-4 text-verified" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Name</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Email</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Role</th>
                        <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Join Date</th>
                        <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t border-border hover:bg-muted/50">
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-foreground">{user.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === "moderator"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-muted-foreground">{user.joinDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                                <Edit className="w-4 h-4 text-primary" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Myth Modal */}
      {showMythModal && (
        <MythModal
          onClose={() => setShowMythModal(false)}
          onSave={(myth) => {
            setMyths([...myths, { ...myth, id: Date.now().toString(), views: 0, date: new Date().toISOString().split("T")[0] }]);
            setShowMythModal(false);
            toast({ title: "Myth added", description: "New myth has been published." });
          }}
        />
      )}

      {/* Add Story Modal */}
      {showStoryModal && (
        <StoryModal
          onClose={() => setShowStoryModal(false)}
          onSave={(story) => {
            setStories([...stories, { ...story, id: Date.now().toString(), likes: 0, date: new Date().toISOString().split("T")[0], status: "published" }]);
            setShowStoryModal(false);
            toast({ title: "Story added", description: "New story has been published." });
          }}
        />
      )}
    </div>
  );
};

// Myth Modal Component
const MythModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (myth: { title: string; status: string; category: string }) => void;
}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("debunked");
  const [category, setCategory] = useState("Health");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Add New Myth</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter myth title..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="verified">Verified True</option>
              <option value="debunked">Debunked</option>
              <option value="partial">Partially True</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="Health">Health</option>
              <option value="Cultural">Cultural</option>
              <option value="Historical">Historical</option>
              <option value="Social">Social</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => onSave({ title, status, category })}
            disabled={!title.trim()}
            className="flex-1"
          >
            Publish Myth
          </Button>
        </div>
      </div>
    </div>
  );
};

// Story Modal Component
const StoryModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (story: { title: string; author: string; category: string }) => void;
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Folklore");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50" onClick={onClose} />
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">Add New Story</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter story title..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="Folklore">Folklore</option>
              <option value="Supernatural">Supernatural</option>
              <option value="Urban Legends">Urban Legends</option>
              <option value="Historical">Historical</option>
              <option value="Regional">Regional Tales</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => onSave({ title, author, category })}
            disabled={!title.trim() || !author.trim()}
            className="flex-1"
          >
            Publish Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
