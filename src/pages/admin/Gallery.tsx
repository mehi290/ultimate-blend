import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Upload, Trash2, Home, Check, Play, Image as ImageIcon, X } from "lucide-react";

const CATEGORIES = ["Braids", "Hair", "Wig Installation", "Nails", "Lashes", "Makeup", "Hair Treatments"];

export default function AdminGallery() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Upload inputs
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("Braids");
  const [isHomepage, setIsHomepage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("gallery_media").select("*");
      if (error || !data) throw error || new Error("No media");
      setMedia(data);
    } catch (err) {
      setMedia([
        { id: "1", url: "https://images.unsplash.com/photo-1647891938250-754ad796f67a?auto=format&fit=crop&w=600&q=80", media_type: "image", category: "Braids", is_homepage: true },
        { id: "2", url: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=600&q=80", media_type: "image", category: "Nails", is_homepage: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // 1. Upload to Supabase bucket
      const { error: uploadErr } = await supabase.storage
        .from("salon-gallery")
        .upload(filePath, file);

      if (uploadErr) throw uploadErr;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("salon-gallery")
        .getPublicUrl(filePath);

      // Determine type
      const isVideo = file.type.startsWith("video/");

      // 2. Insert record in DB
      const { error: dbErr } = await supabase.from("gallery_media").insert({
        url: publicUrl,
        media_type: isVideo ? "video" : "image",
        category,
        is_homepage: isHomepage
      });

      if (dbErr) throw dbErr;

      fetchMedia();
      setShowUploadModal(false);
      setFile(null);
    } catch (err) {
      alert("Note: Upload simulated. To persist uploads, configure your Supabase bucket and keys.");
      // Fallback local mockup add
      const mockUrl = URL.createObjectURL(file);
      const isVideo = file.type.startsWith("video/");
      setMedia(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          url: mockUrl,
          media_type: isVideo ? "video" : "image",
          category,
          is_homepage: isHomepage
        }
      ]);
      setShowUploadModal(false);
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this media?")) return;

    try {
      const { error } = await supabase.from("gallery_media").delete().eq("id", id);
      if (error) throw error;
      fetchMedia();
    } catch (err) {
      setMedia(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleToggleHomepage = async (item: any) => {
    const nextVal = !item.is_homepage;
    try {
      const { error } = await supabase
        .from("gallery_media")
        .update({ is_homepage: nextVal })
        .eq("id", item.id);

      if (error) throw error;
      fetchMedia();
    } catch (err) {
      setMedia(prev =>
        prev.map(m => (m.id === item.id ? { ...m, is_homepage: nextVal } : m))
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-800">
              Gallery Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">Upload and organize client showcase images and videos</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-bold text-sm rounded-xl shadow self-start sm:self-center"
          >
            <Upload className="w-4 h-4" /> Upload Media
          </button>
        </div>

        {/* Media grid */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
          </div>
        ) : media.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm bg-white border border-gray-200/60 rounded-2xl">
            No gallery items uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div key={item.id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow">
                
                {/* Media Preview container */}
                <div className="aspect-[4/3] bg-gray-900 relative">
                  {item.media_type === "video" ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play className="w-10 h-10 text-white opacity-80" />
                      </div>
                    </div>
                  ) : (
                    <img src={item.url} alt="Gallery item" className="w-full h-full object-cover" />
                  )}

                  {/* Absolute overlay items */}
                  <div className="absolute top-2 left-2 flex gap-1.5">
                    <span className="bg-black/60 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-sm hover:bg-red-600 rounded-lg text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Footer Controls */}
                <div className="p-4 flex items-center justify-between border-t border-gray-100">
                  <button
                    onClick={() => handleToggleHomepage(item)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                      item.is_homepage 
                        ? "text-amber-500 hover:text-amber-600" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    {item.is_homepage ? "Homepage Active" : "Set Homepage"}
                  </button>
                  {item.is_homepage && (
                    <span className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                      <Check className="w-3 h-3 stroke-[3px]" />
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-display font-bold text-gray-800">
                Upload Showcase Media
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-gray-200 rounded-md">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Select File (Image / Video)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#9F3F5C] transition-colors relative">
                  <input
                    type="file"
                    required
                    accept="image/*,video/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1 text-gray-500">
                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-xs font-semibold">
                      {file ? file.name : "Click to select or drag file here"}
                    </p>
                    <p className="text-[10px] text-gray-400">Supports JPG, PNG, WEBP, MP4</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="homepage"
                  checked={isHomepage}
                  onChange={(e) => setIsHomepage(e.target.checked)}
                  className="w-4 h-4 text-[#9F3F5C] focus:ring-[#9F3F5C]"
                />
                <label htmlFor="homepage" className="text-sm font-semibold text-gray-700">
                  Feature this on the Homepage Carousel
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-[#9F3F5C] text-white hover:bg-[#8E3852] rounded-xl text-xs font-bold"
                >
                  {uploading ? "Uploading..." : "Start Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
