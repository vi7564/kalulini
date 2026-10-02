'use client';

import React, { useState, useEffect } from 'react';
import { PortalLayout } from '@/components/portal/PortalLayout';
import { announcementService } from '@/lib/services/announcementService';
import { Announcement } from '@/types';
import { useNotification } from '@/context/NotificationContext';
import { Modal } from '@/components/ui/Modal';
import { Megaphone, Plus, Trash2, Edit2, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const { showToast } = useNotification();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);

  const [formData, setFormData] = useState<Omit<Announcement, 'id'>>({
    title: '',
    content: '',
    category: 'General',
    targetAudience: 'All',
    isTopBanner: true,
    published: true,
    publishedAt: new Date().toISOString().slice(0, 10),
    authorName: 'Office of the Principal'
  });

  const loadData = () => {
    announcementService.getAnnouncements().then(setAnnouncements);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      content: '',
      category: 'General',
      targetAudience: 'All',
      isTopBanner: true,
      published: true,
      publishedAt: new Date().toISOString().slice(0, 10),
      authorName: 'Office of the Principal'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Announcement) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      targetAudience: item.targetAudience,
      isTopBanner: item.isTopBanner,
      published: item.published,
      publishedAt: item.publishedAt,
      authorName: item.authorName
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      showToast('error', 'Missing Information', 'Please provide a title and announcement content.');
      return;
    }

    if (editingItem) {
      await announcementService.updateAnnouncement(editingItem.id, formData);
      showToast('success', 'Announcement Updated', 'Changes saved successfully.');
    } else {
      await announcementService.addAnnouncement(formData);
      showToast('success', 'Announcement Published', 'Announcement is now live.');
    }

    setIsModalOpen(false);
    loadData();
  };

  const toggleTopBanner = async (item: Announcement) => {
    await announcementService.updateAnnouncement(item.id, { isTopBanner: !item.isTopBanner });
    showToast('info', 'Banner Toggled', `Top banner status updated.`);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this announcement?")) {
      await announcementService.deleteAnnouncement(id);
      showToast('info', 'Announcement Deleted', 'Removed from circulation.');
      loadData();
    }
  };

  return (
    <PortalLayout title="Announcements & Public Banner CMS" subtitle="Manage notices displayed on the website top announcement bar and role-specific bulletin boards">
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs text-slate-600">
          Total Published Notices: <strong>{announcements.length}</strong>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-charcoal-800">
                  {ann.category}
                </span>
                {ann.isTopBanner && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-100 text-gold-900 border border-gold-300">
                    ★ Public Top Bar Active
                  </span>
                )}
                <span className="text-[11px] text-slate-400">&bull; {ann.publishedAt}</span>
              </div>

              <h3 className="text-base font-bold text-charcoal-900">{ann.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

              <span className="text-[11px] text-slate-400 block">
                Target: <strong>{ann.targetAudience}</strong> &bull; Signed: {ann.authorName}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
              <button
                onClick={() => toggleTopBanner(ann)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  ann.isTopBanner
                    ? 'bg-gold-50 border-gold-300 text-gold-900 hover:bg-gold-100'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {ann.isTopBanner ? 'Remove from Top Bar' : 'Set as Top Bar'}
              </button>

              <button
                onClick={() => openEditModal(ann)}
                className="p-2 rounded-lg text-slate-500 hover:text-aqua-600 hover:bg-slate-100"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(ann.id)}
                className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Announcement Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Announcement" : "Create Announcement"}>
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Term 1 Opening Dates & Boarding Requisites"
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="Academic">Academic</option>
                <option value="Admissions">Admissions</option>
                <option value="General">General</option>
                <option value="Urgent">Urgent</option>
                <option value="Boarding">Boarding</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Audience</label>
              <select
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              >
                <option value="All">All Users & Public</option>
                <option value="Students">Students Only</option>
                <option value="Teachers">Teachers Only</option>
                <option value="Parents">Parents Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Content Text *</label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Detailed announcement content..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopBanner}
                onChange={(e) => setFormData({ ...formData, isTopBanner: e.target.checked })}
              />
              <span className="font-semibold text-slate-700">Display on Public Website Top Announcement Bar</span>
            </label>
          </div>

          <div className="pt-4 border-t flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-aqua-600 hover:bg-aqua-700 text-white font-bold uppercase transition-colors"
            >
              Save Announcement
            </button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}
