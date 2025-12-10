import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/TranslatedText';
import { Users, Globe, Headphones, Video, Copy, Check, PenTool } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { useToast } from '@/hooks/use-toast';
import LaserFlow from '@/components/3D/LaserFlow';
import { RoomSidebar } from '@/components/VR/RoomSidebar';
import { WhiteboardPanel } from '@/components/VR/WhiteboardPanel';
import { ModelViewer } from '@/components/VR/ModelViewer';
import {
  MOCK_VR_ROOMS,
  canAddWhiteboard,
  type VRRoom,
  type VRModel,
} from '@/mocks/vrCollaborators';

export default function StudyVR() {
  const user = useUserStore((state) => state.user);
  const [copied, setCopied] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<VRRoom>(MOCK_VR_ROOMS[0]);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState<VRModel | null>(null);
  const { toast } = useToast();
  const vrLink = selectedRoom.frameUrl;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(vrLink);
      setCopied(true);
      toast({
        title: 'Link copied!',
        description: 'The VR room link has been copied to your clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again or copy manually.',
        variant: 'destructive',
      });
    }
  };

  const handleRoomChange = (room: VRRoom) => {
    setSelectedRoom(room);
    toast({
      title: `Switched to ${room.name}`,
      description: `Loading ${room.name} virtual environment...`,
    });
  };

  const handleOpenWhiteboard = () => {
    if (!canAddWhiteboard(selectedRoom.id)) {
      toast({
        title: 'Maximum whiteboards reached',
        description: `${selectedRoom.name} has reached the limit of ${selectedRoom.maxWhiteboards} whiteboards. Join another room or ask to remove one.`,
        variant: 'destructive',
      });
      return;
    }
    setIsWhiteboardOpen(true);
  };

  const handleModelUpload = (fileName: string, fileType: 'glb' | 'obj') => {
    const newModel: VRModel = {
      id: `model-${Date.now()}`,
      name: fileName,
      fileType,
      preview: fileType === 'glb' ? '🧬' : '🪐',
      uploadedBy: user?.name || 'Anonymous',
      timestamp: Date.now(),
    };
    setCurrentModel(newModel);
  };

  const handleModelReupload = () => {
    setCurrentModel(null);
    setIsWhiteboardOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-deepblack">
      {/* LaserFlow Background */}
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
        <LaserFlow
          color="#FFD700"
          fogIntensity={0.7}
          verticalBeamOffset={0}
          flowSpeed={0.4}
        />
      </div>

      {/* Room Sidebar */}
      <RoomSidebar selectedRoom={selectedRoom} onRoomChange={handleRoomChange} />

      {/* Whiteboard Panel */}
      <WhiteboardPanel
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        onModelUpload={handleModelUpload}
        roomId={selectedRoom.id}
        roomName={selectedRoom.name}
      />

      {/* Model Viewer */}
      <AnimatePresence>
        {currentModel && (
          <ModelViewer
            model={currentModel}
            onClose={() => setCurrentModel(null)}
            onReupload={handleModelReupload}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl ml-[320px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-4 bg-pink border-4 border-black shadow-pink-brutal rounded-lg">
            <Video className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-black uppercase text-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              <TranslatedText text="Study VR" />
            </h1>
            <p className="text-lg font-bold text-white uppercase mt-2">
              <TranslatedText text="Join your classmates in a virtual study environment" />
            </p>
          </div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-4 border-black shadow-gold-brutal bg-obsidian">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-gold" />
              <CardTitle className="text-lg font-black uppercase text-gold">
                <TranslatedText text="Collaborative Learning" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-white font-bold">
              <TranslatedText text="Study together with students from around the world in an immersive 3D environment" />
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-pink-brutal bg-obsidian">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-pink" />
              <CardTitle className="text-lg font-black uppercase text-pink">
                <TranslatedText text="Virtual Space" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <TranslatedText text="Experience learning in a shared virtual reality space designed for collaboration" />
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Headphones className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                <TranslatedText text="Voice & Video" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <TranslatedText text="Communicate with other students using voice and video chat features" />
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* VR Environment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-4 border-black shadow-gold-brutal">
          <CardHeader className="bg-gradient-to-br from-gold/20 to-transparent border-b-4 border-black">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black uppercase text-gold">
                  <TranslatedText text="Virtual Study Room" />
                </CardTitle>
                <CardDescription>
                  {user?.name ? (
                    <>
                      <TranslatedText text="Welcome" />, <span className="font-semibold">{user.name}</span>! <TranslatedText text="Join the virtual study space below." />
                    </>
                  ) : (
                    <TranslatedText text="Join the virtual study space below." />
                  )}
                </CardDescription>
              </div>
              <Button
                onClick={handleOpenWhiteboard}
                className="bg-pink hover:bg-pink/90 text-white font-bold border-4 border-black shadow-pink-brutal"
                aria-label="Open whiteboard"
              >
                <PenTool className="h-4 w-4 mr-2" />
                <TranslatedText text="Whiteboard" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full bg-black rounded-b-lg overflow-hidden">
              <iframe
                key={selectedRoom.id}
                src={selectedRoom.frameUrl}
                className="w-full border-0"
                allow="microphone; camera; fullscreen; autoplay"
                allowFullScreen
                title={`${selectedRoom.name} VR Environment`}
                style={{ minHeight: '600px', height: '75vh' }}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Invite Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <Card className="border-4 border-black shadow-pink-brutal bg-obsidian">
          <CardHeader className="border-b-4 border-black bg-gradient-to-br from-pink/20 to-transparent">
            <CardTitle className="text-lg flex items-center gap-2 font-black uppercase text-pink">
              <Users className="h-5 w-5" />
              <TranslatedText text="Invite Friends" />
            </CardTitle>
            <CardDescription className="text-gray-300">
              <TranslatedText text="Share this link with your friends to study together in the virtual environment" />
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="flex-1 p-3 bg-darknavy rounded-md border-2 border-black flex items-center gap-2">
                <span className="text-sm font-mono text-white break-all">
                  {vrLink}
                </span>
              </div>
              <Button
                onClick={copyToClipboard}
                variant={copied ? 'default' : 'outline'}
                className={`shrink-0 border-4 border-black font-bold ${
                  copied
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gold hover:bg-gold/90 text-black'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <TranslatedText text="Copied!" />
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    <TranslatedText text="Copy Link" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6"
      >
        <Card className="border-4 border-black shadow-blue-brutal bg-obsidian">
          <CardHeader className="border-b-4 border-black bg-gradient-to-br from-blue/20 to-transparent">
            <CardTitle className="text-lg font-black uppercase text-blue">
              <TranslatedText text="Getting Started" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-gold font-black text-lg">1.</span>
                <span className="font-bold">
                  <TranslatedText text="Allow microphone and camera permissions when prompted" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-black text-lg">2.</span>
                <span className="font-bold">
                  <TranslatedText text="Use WASD keys or arrow keys to move around the virtual space" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-black text-lg">3.</span>
                <span className="font-bold">
                  <TranslatedText text="Click on other avatars to interact with fellow students" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-black text-lg">4.</span>
                <span className="font-bold">
                  <TranslatedText text="Use the chat feature or voice chat to communicate with others" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gold font-black text-lg">5.</span>
                <span className="font-bold">
                  <TranslatedText text="Explore the virtual environment and find study spots to collaborate" />
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-pink font-black text-lg">6.</span>
                <span className="font-bold">
                  <TranslatedText text="Click the Whiteboard button to open collaborative drawing tools" />
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
      </div>
    </div>
  );
}

