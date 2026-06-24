import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MessageAppProps {
  onClose: () => void;
}

export function MessageApp({ onClose }: MessageAppProps) {
  const [activeChat, setActiveChat] = useState<boolean>(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col bg-white"
    >
      <AnimatePresence mode="wait">
        {!activeChat ? (
          <motion.div 
            key="list"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="flex h-full flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-white px-4 pb-3 pt-12">
              <button onClick={onClose} className="p-2 text-pink-500">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-lg font-bold text-gray-900">메시지</h1>
              <div className="w-10"></div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              <button 
                onClick={() => setActiveChat(true)}
                className="flex w-full items-center gap-4 border-b px-4 py-4 text-left hover:bg-gray-50 active:bg-gray-100"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg font-bold text-gray-600">
                  CR
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-gray-900">크랙대학교 입학처</h3>
                    <span className="text-xs text-gray-500">오후 2:30</span>
                  </div>
                  <p className="truncate text-sm text-gray-600">
                    [신입생 환영회 안내] 안녕하세요, 크랙대학교 유아...
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-pink-500"></div>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="flex h-full flex-col bg-gray-100"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b bg-white px-4 pb-3 pt-12 shadow-sm">
              <button onClick={() => setActiveChat(false)} className="flex items-center text-pink-500">
                <ChevronLeft size={24} />
                <span className="text-sm font-medium">뒤로</span>
              </button>
              <h1 className="text-base font-bold text-gray-900">크랙대학교 입학처</h1>
              <div className="w-16"></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex flex-col items-center mb-6">
                <span className="text-xs text-gray-500 bg-gray-200/50 px-3 py-1 rounded-full">2026년 2월 20일 금요일</span>
              </div>
              
              <div className="flex flex-col gap-1 items-start w-[85%]">
                <div className="rounded-2xl rounded-tl-none bg-white p-3 shadow-sm text-sm text-gray-800 leading-relaxed border border-gray-100">
                  [크랙대학교 합격통지]<br/>
                  이체리 학생의 2026학년도 크랙대학교 유아교육학과 합격을 진심으로 축하드립니다!<br/><br/>
                  자세한 등록 및 입학 절차는 학교 홈페이지를 참조해 주시기 바랍니다.
                </div>
                <span className="text-[10px] text-gray-400 ml-1">오전 10:00</span>
              </div>

              <div className="flex flex-col items-center my-4">
                <span className="text-xs text-gray-500 bg-gray-200/50 px-3 py-1 rounded-full">2026년 2월 28일 토요일</span>
              </div>

              <div className="flex flex-col gap-1 items-start w-[85%]">
                <div className="rounded-2xl rounded-tl-none bg-white p-3 shadow-sm text-sm text-gray-800 leading-relaxed border border-gray-100">
                  [신입생 환영회 안내]<br/>
                  안녕하세요, 크랙대학교 유아교육학과 학생회입니다.<br/><br/>
                  26학번 새내기 여러분을 위한 신입생 환영회가 아래와 같이 개최됩니다.<br/><br/>
                  - 일시: 3월 2일(월) 오후 6시<br/>
                  - 장소: 크랙대학교 체육관<br/><br/>
                  동기, 선배들과 친해질 수 있는 자리이니 꼭 참석해 주세요!
                </div>
                <span className="text-[10px] text-gray-400 ml-1">오후 2:30</span>
              </div>
            </div>

            {/* Input Placeholder */}
            <div className="border-t bg-white p-3 pb-6 sm:pb-3">
              <div className="flex items-center gap-2 rounded-full border bg-gray-50 px-4 py-2">
                <input 
                  type="text" 
                  disabled
                  placeholder="답장을 보낼 수 없는 번호입니다." 
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
                <button disabled className="text-gray-300">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
