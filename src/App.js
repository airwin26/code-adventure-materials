import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [links, setLinks] = useState([
    {
      id: 1,
      title: 'React Documentation',
      url: 'https://reactjs.org/docs/getting-started.html',
      category: 'Frontend',
      description: 'Official React documentation',
    },
    {
      id: 2,
      title: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/',
      category: 'Web Development',
      description: 'Mozilla Developer Network documentation',
    },
  ]);

  const [additionalMaterials, setAdditionalMaterials] = useState([
    {
      id: 1,
      title: 'Internal Documentation',
      url: 'https://example.com/internal-docs',
      category: 'Internal',
    },
    {
      id: 2,
      title: 'Team Resources',
      url: 'https://example.com/team',
      category: 'Internal',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [openAdditional, setOpenAdditional] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    category: '',
    description: '',
  });

  const [newAdditionalMaterial, setNewAdditionalMaterial] = useState({
    title: '',
    url: '',
    category: 'Internal',
  });

  const categories = [
    'Cyber Security',
    'UX Design',
    'Data Analytics',
    'Software Engineering',
    'Web Development'
  ];

  const handleLogin = () => {
    if (password === 'capstone') {
      setIsAdmin(true);
      setShowLoginDialog(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { ...newLink, id: Date.now() }]);
      setNewLink({ title: '', url: '', category: '', description: '' });
      setOpen(false);
    }
  };

  const handleDeleteLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleAddAdditionalMaterial = () => {
    if (newAdditionalMaterial.title && newAdditionalMaterial.url) {
      setAdditionalMaterials([...additionalMaterials, { ...newAdditionalMaterial, id: Date.now() }]);
      setNewAdditionalMaterial({ title: '', url: '', category: 'Internal' });
      setOpenAdditional(false);
    }
  };

  const handleDeleteAdditionalMaterial = (id) => {
    setAdditionalMaterials(additionalMaterials.filter((material) => material.id !== id));
  };

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#327C81' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img src="/logo.svg" alt="Code Adventure Logo" style={{ height: 24, marginRight: 10 }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton 
            onClick={() => isAdmin ? handleLogout() : setShowLoginDialog(true)}
            sx={{ color: 'primary.contrastText' }}
          >
            {isAdmin ? <LockOpenIcon /> : <LockIcon />}
          </IconButton>
          {isMobile && (
            <IconButton sx={{ color: 'primary.contrastText' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          height: { xs: '200px', sm: '300px' },
          width: '100%',
          background: '#25636b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 700, color: 'primary.contrastText' }}>
            Code Adventure Resources
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'primary.contrastText', opacity: 0.9 }}>
            Your one-stop shop for all Code Adventure resources
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              maxWidth: '400px',
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                height: '40px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputBase-input': {
                color: 'primary.dark',
                py: '8px',
              },
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 600 }}>
            Camp Resources
          </Typography>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{ 
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                height: '36px',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                }
              }}
            >
              Add Resource
            </Button>
          )}
        </Box>

        <Grid container spacing={3}>
          {filteredLinks.map((link) => (
            <Grid item xs={12} sm={6} md={4} key={link.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
                }
              }}>
                <CardContent sx={{ 
                  flexGrow: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.95)',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                      {link.title}
                    </Typography>
                    {isAdmin && (
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteLink(link.id)}
                        sx={{ color: 'secondary.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Chip
                    label={link.category}
                    size="small"
                    sx={{
                      mt: 1,
                      mb: 1,
                      bgcolor: 'primary.light',
                      color: 'primary.dark',
                      fontWeight: 500,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {link.description}
                  </Typography>
                  <Button
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ 
                      borderColor: 'secondary.main',
                      color: 'secondary.main',
                      '&:hover': {
                        borderColor: 'secondary.dark',
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText'
                      }
                    }}
                  >
                    Visit Link
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Materials Section - Visible to All */}
      <Box sx={{ 
        width: '100vw',
        bgcolor: 'rgba(50, 124, 129, 0.15)',
        py: 6,
        mt: 8,
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 600 }}>
              Additional Materials
            </Typography>
            {isAdmin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAdditional(true)}
                sx={{ 
                  bgcolor: 'secondary.main',
                  color: 'secondary.contrastText',
                  height: '36px',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  }
                }}
              >
                Add Material
              </Button>
            )}
          </Box>
          <Grid container spacing={2}>
            {additionalMaterials.map((material) => (
              <Grid item xs={12} sm={6} md={4} key={material.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                        {material.title}
                      </Typography>
                      {isAdmin && (
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteAdditionalMaterial(material.id)}
                          sx={{ color: 'secondary.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Chip
                      label={material.category}
                      size="small"
                      sx={{
                        mt: 1,
                        mb: 1,
                        bgcolor: 'primary.light',
                        color: 'primary.dark',
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                    />
                    <Button
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{ 
                        mt: 1,
                        borderColor: 'secondary.main',
                        color: 'secondary.main',
                        '&:hover': {
                          borderColor: 'secondary.dark',
                          bgcolor: 'secondary.main',
                          color: 'secondary.contrastText'
                        }
                      }}
                    >
                      Visit Link
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Add Resource Dialog */}
      {isAdmin && (
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1, color: 'primary.dark' }}>Add New Resource</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="URL"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newLink.category}
                  label="Category"
                  onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Description"
                value={newLink.description}
                onChange={(e) => setNewLink({ ...newLink, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddLink} 
              variant="contained"
              sx={{ 
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                }
              }}
            >
              Add Resource
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Add Additional Material Dialog - Admin Only */}
      {isAdmin && (
        <Dialog 
          open={openAdditional} 
          onClose={() => setOpenAdditional(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ pb: 1, color: 'primary.dark' }}>Add Additional Material</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
              <TextField
                label="Title"
                value={newAdditionalMaterial.title}
                onChange={(e) => setNewAdditionalMaterial({ ...newAdditionalMaterial, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="URL"
                value={newAdditionalMaterial.url}
                onChange={(e) => setNewAdditionalMaterial({ ...newAdditionalMaterial, url: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newAdditionalMaterial.category}
                  label="Category"
                  onChange={(e) => setNewAdditionalMaterial({ ...newAdditionalMaterial, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={() => setOpenAdditional(false)}
              sx={{ color: 'text.secondary' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddAdditionalMaterial} 
              variant="contained"
              sx={{ 
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                }
              }}
            >
              Add Material
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Login Dialog */}
      <Dialog
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1, color: 'primary.dark' }}>Admin Login</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setShowLoginDialog(false)}
            sx={{ color: 'text.secondary' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleLogin}
            variant="contained"
            sx={{ 
              bgcolor: 'secondary.main',
              '&:hover': {
                bgcolor: 'secondary.dark',
              }
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App; 