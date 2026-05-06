'use client'

import React from 'react'

interface LayoutProps {
  aiBar?: React.ReactNode
  liveBar?: React.ReactNode
  sidebar: React.ReactNode
  canvas: React.ReactNode
  codePanel: React.ReactNode
}

export default function Layout({ aiBar, liveBar, sidebar, canvas, codePanel }: LayoutProps) {
  return (
    <div className="h-[calc(100vh-56px)] overflow-hidden bg-[#EDEDED] flex flex-col">
      {aiBar && <div>{aiBar}</div>}
      {liveBar && <div>{liveBar}</div>}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-[260px] bg-white rounded-xl shadow-sm overflow-y-auto m-3">
          {sidebar}
        </div>
        <div className="flex flex-col w-[550px] shrink-0 overflow-hidden my-3">
          {canvas}
        </div>
        <div className="flex flex-col flex-1 bg-white rounded-xl shadow-sm overflow-hidden m-3 ml-0">
          {codePanel}
        </div>
      </div>
    </div>
  )
}