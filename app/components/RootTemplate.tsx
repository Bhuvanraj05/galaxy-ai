'use client';

import { useState } from 'react';
import Sidebar from '@/components/shared/Sidebar';
import TopBar from '@/components/TopBar';
import CanvasContainer from '@/components/CanvasContainer';
import Canvas from '@/components/Canvas';
import { colors } from '@/app/styles/theme';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [canvasData, setCanvasData] = useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar 
        isCollapsed={isCollapsed} 
        onCollapse={setIsCollapsed} 
      />
      <div className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${
        isCollapsed ? 'ml-[60px]' : 'ml-[240px]'
      } ${isCanvasOpen ? 'mr-[600px]' : ''}`}>
        <TopBar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
      <CanvasContainer
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
      >
        <Canvas data={canvasData} />
      </CanvasContainer>
    </div>
  );
} 