import React, { useState } from 'react';
import {
  Container, Card, CardContent, Typography, Checkbox, LinearProgress,
  Rating, TextField, Button, Chip, Stack, Box, Grid, Avatar
} from '@mui/material';
import { CheckCircle, ChildCare } from '@mui/icons-material';

interface Task { id: string; childId: string; title: string; role: 'Nanny' | 'Cook' | 'Tutor'; completed: boolean; }
interface Feedback { id: string; childId: string; rating: number; note: string; date: string; }

const CHILDREN = [
  { id: '1', name: 'Liam', age: '4 yrs', color: '#1976d2' },
  { id: '2', name: 'Maya', age: '7 yrs', color: '#7b1fa2' },
];

const INITIAL_TASKS: Task[] = [
  { id: 't1', childId: '1', title: 'Morning Inhaler & Breakfast Routine', role: 'Nanny', completed: true },
  { id: 't2', childId: '1', title: 'Nutrient-Rich Lunch Prep (Allergy-Safe)', role: 'Cook', completed: false },
  { id: 't3', childId: '1', title: 'Phonics Flashcards & Reading (20m)', role: 'Tutor', completed: false },
  { id: 't4', childId: '2', title: 'Violin Practice Supervision (Grade 2)', role: 'Tutor', completed: true },
  { id: 't5', childId: '2', title: 'After-School High-Protein Snack', role: 'Cook', completed: true },
  { id: 't6', childId: '2', title: 'Soccer Kit Pack & Field Drop-off', role: 'Nanny', completed: false },
];

const INITIAL_FEEDBACK: Feedback[] = [
  { id: 'f1', childId: '1', rating: 5, note: 'Liam took his medicine smoothly with zero fuss!', date: 'Today, 2:30 PM' },
];

const ROLE_COLORS: Record<Task['role'], 'primary' | 'secondary' | 'warning'> = {
  Nanny: 'primary', Cook: 'warning', Tutor: 'secondary',
};

export default function App() {
  const [activeChildId, setActiveChildId] = useState<string>('1');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(INITIAL_FEEDBACK);
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [newRating, setNewRating] = useState<number | null>(5);
  const [newNote, setNewNote] = useState('');

  const activeChild = CHILDREN.find((c) => c.id === activeChildId) || CHILDREN[0];
  const allChildTasks = tasks.filter((t) => t.childId === activeChildId);
  const displayedTasks = allChildTasks.filter((t) => roleFilter === 'All' || t.role === roleFilter);
  const completedCount = allChildTasks.filter((t) => t.completed).length;
  const progress = allChildTasks.length ? Math.round((completedCount / allChildTasks.length) * 100) : 0;
  const childFeedback = feedbackList.filter((f) => f.childId === activeChildId);

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  };

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const entry: Feedback = {
      id: Date.now().toString(), childId: activeChildId, rating: newRating || 5, note: newNote.trim(), date: 'Just now',
    };
    setFeedbackList((prev) => [entry, ...prev]);
    setNewNote('');
    setNewRating(5);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Child Profile Switcher */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} mb={3}>
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ChildCare color="primary" fontSize="large" /> RaiseCare
            </Typography>
            <Typography variant="body2" color="text.secondary">Low-cognitive-load delegation & domestic staff sync</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {CHILDREN.map((child) => (
              <Chip
                key={child.id}
                avatar={<Avatar sx={{ bgcolor: `${child.color} !important`, color: '#fff' }}>{child.name[0]}</Avatar>}
                label={`${child.name} • ${child.age}`}
                clickable
                color={activeChildId === child.id ? 'primary' : 'default'}
                variant={activeChildId === child.id ? 'filled' : 'outlined'}
                onClick={() => { setActiveChildId(child.id); setRoleFilter('All'); }}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Stack>

        {/* Dynamic Routine Progress Bar */}
        <Card elevation={0} sx={{ mb: 3, borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
          <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700} color="#1e293b">{activeChild.name}'s Daily Routine</Typography>
                <Typography variant="caption" color="text.secondary">{completedCount} of {allChildTasks.length} tasks completed today</Typography>
              </Box>
              <Chip icon={<CheckCircle sx={{ fontSize: '18px !important' }} />} label={`${progress}% Complete`} color={progress === 100 ? 'success' : 'primary'} size="small" sx={{ fontWeight: 700 }} />
            </Stack>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, bgcolor: '#e2e8f0' }} />
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Interactive Caregiver Task Checklist */}
          <Grid item xs={12} md={7}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={700} fontSize="1.05rem">Caregiver Tasks</Typography>
                  <Stack direction="row" spacing={0.5}>
                    {['All', 'Nanny', 'Cook', 'Tutor'].map((role) => (
                      <Chip key={role} label={role} size="small" clickable onClick={() => setRoleFilter(role)} color={roleFilter === role ? 'primary' : 'default'} variant={roleFilter === role ? 'filled' : 'outlined'} sx={{ fontSize: '0.75rem', height: 24 }} />
                    ))}
                  </Stack>
                </Stack>
                <Stack spacing={1.2}>
                  {displayedTasks.map((task) => (
                    <Box
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      sx={{
                        p: 1.5, borderRadius: 2, border: '1px solid', borderColor: task.completed ? '#cbd5e1' : '#e2e8f0',
                        bgcolor: task.completed ? '#f1f5f9' : '#fff', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.15s',
                        '&:hover': { bgcolor: '#f8fafc', borderColor: '#94a3b8' },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mr: 1, overflow: 'hidden' }}>
                        <Checkbox checked={task.completed} size="small" sx={{ p: 0.5 }} />
                        <Typography variant="body2" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'text.secondary' : '#0f172a', fontWeight: task.completed ? 400 : 500 }}>
                          {task.title}
                        </Typography>
                      </Stack>
                      <Chip label={task.role} color={ROLE_COLORS[task.role]} size="small" variant="outlined" sx={{ fontWeight: 600, height: 22 }} />
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Feedback & Improvement Loop */}
          <Grid item xs={12} md={5}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff', mb: 2.5 }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="h6" fontWeight={700} fontSize="1.05rem" mb={0.5}>Parent Feedback</Typography>
                <Typography variant="caption" color="text.secondary" display="block" mb={2}>Guidance & quality tracker for staff</Typography>
                <Box component="form" onSubmit={handleAddFeedback}>
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Care Rating</Typography>
                      <Rating value={newRating} onChange={(_, val) => setNewRating(val)} size="medium" />
                    </Box>
                    <TextField size="small" placeholder={`Note for ${activeChild.name}'s caregivers...`} multiline rows={2} value={newNote} onChange={(e) => setNewNote(e.target.value)} fullWidth />
                    <Button type="submit" variant="contained" size="small" disabled={!newNote.trim()} sx={{ textTransform: 'none', fontWeight: 600 }}>
                      Log Feedback Note
                    </Button>
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', bgcolor: '#fff' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="subtitle2" fontWeight={700} color="#1e293b" mb={1.5}>Feedback History ({activeChild.name})</Typography>
                <Stack spacing={1} sx={{ maxHeight: 200, overflowY: 'auto' }}>
                  {childFeedback.length === 0 ? (
                    <Typography variant="caption" color="text.secondary">No feedback notes recorded yet.</Typography>
                  ) : (
                    childFeedback.map((fb) => (
                      <Box key={fb.id} sx={{ p: 1.25, borderRadius: 2, bgcolor: '#f8fafc', borderLeft: '3px solid #0284c7' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Rating value={fb.rating} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary">{fb.date}</Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ mt: 0.5, fontSize: '0.8rem', color: '#334155' }}>{fb.note}</Typography>
                      </Box>
                    ))
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
