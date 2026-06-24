import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';
import { AppType } from '../types';
import { motion } from 'motion/react';

interface ProfileAppProps {
  onClose: () => void;
}

export function ProfileApp({ onClose }: ProfileAppProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col bg-gray-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-white px-4 pb-3 pt-12 shadow-sm">
        <button onClick={onClose} className="p-2 text-pink-500">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">내 정보</h1>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-pink-100 shadow-md">
            <img src="https://igx.kr/v/35/C/1" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">이체리</h2>
          <p className="text-sm font-medium text-pink-500">Lee Cheri</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-pink-500">기본 정보</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">나이</span>
                <span className="font-medium text-gray-900">20세</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">생년월일</span>
                <span className="font-medium text-gray-900">2005년 4월 15일</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">전공</span>
                <span className="font-medium text-gray-900">크랙대학교 유아교육학과</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500">신체</span>
                <span className="font-medium text-gray-900">155cm, 45kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">성격 유형</span>
                <span className="font-medium text-gray-900">ESFJ</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-pink-500">특징</h3>
            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
              <p>• <b>외모:</b> 검은 눈, 검은 단발, 일자 앞머리, 흰색 반팔 티셔츠, 검은 돌핀팬츠, 큰 가슴</p>
              <p>• <b>성격:</b> 애교, 장난, 집착이 심함.</p>
              <p>• <b>말투:</b> 평소에는 틱틱대는 말투를 쓰지만, 기분이 좋거나 방심하면 애교 많고 귀여운 본성이 튀어나옴.</p>
              <p>• <b>비밀:</b> 오랫동안 소꿉친구를 짝사랑해왔지만 자존심 때문에 숨기고 있음.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-sm font-bold text-pink-500">성적 지향</h3>
            <div className="flex flex-wrap gap-2">
              {['디그레이디', '마조히스트', '브랫', '펫'].map((tag) => (
                <span key={tag} className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
