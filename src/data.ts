import { FestivalData, StageColors } from './types'

export const festivalData: FestivalData = {
  day1: {
    date: '11.29 SAT',
    stages: {
      '天空舞台': [
        { time: '14:40 - 15:30', artist: '9m88', sub: 'This Temporary Ensemble Vol.2' },
        { time: '16:00 - 16:40', artist: '阿肆', sub: '' },
        { time: '17:20 - 18:10', artist: '鄭宜農 feat. 李瀧 Lang Lee', sub: '' },
        { time: '19:00 - 19:50', artist: '戴佩妮 Penny Tai', sub: '' },
        { time: '20:40 - 21:25', artist: '林憶蓮', sub: '' },
      ],
      '微風舞台': [
        { time: '14:00 - 14:40', artist: '凹與山 Our Shame', sub: '' },
        { time: '15:30 - 16:00', artist: '張溢勛 Giyu Tjuljaviya', sub: '' },
        { time: '16:40 - 17:20', artist: '就以斯JOYCE feat. PIZZALI', sub: '' },
        { time: '18:10 - 18:50', artist: '知更 John Stoniae', sub: '' },
        { time: '19:50 - 20:30', artist: '自然捲（魏如萱＆奇哥）', sub: '' },
      ],
      'Legacy 舞台': [
        { time: '13:20 - 14:00', artist: '特別企劃【未來進行式】', sub: '小樹 + 黃玠 + dato' },
        { time: '14:50 - 15:30', artist: '庸俗救星 Vulgar Savior', sub: '' },
        { time: '16:10 - 16:50', artist: 'Andr', sub: '' },
        { time: '17:30 - 18:10', artist: '丹丹猫猫', sub: 'aDAN薛詒丹 x Miao Miao Flow' },
        { time: '18:50 - 19:30', artist: '我是機車少女I\'mdifficult', sub: '' },
        { time: '20:10 - 20:50', artist: 'The Chairs 椅子樂團', sub: '' },
        { time: '21:40 - 22:30', artist: '傷心欲絕 Wayne\'s So Sad', sub: '' },
      ],
      '街聲舞台': [
        { time: '13:00 - 13:20', artist: '【復展開幕】DJ BENN', sub: '' },
        { time: '13:50 - 14:20', artist: 'Osean 吳獻', sub: '' },
        { time: '15:00 - 15:30', artist: 'Niki the Unicorn', sub: '' },
        { time: '16:20 - 16:50', artist: 'YaMon Social Club 壓滿俱樂部', sub: '' },
        { time: '17:50 - 18:20', artist: '老貓偵探社', sub: '' },
        { time: '19:10 - 19:40', artist: '紙鳶 Seizer', sub: '' },
        { time: '20:20 - 21:00', artist: 'someshiit 山姆', sub: '' },
        { time: '21:30 - 22:20', artist: '【荒島派對】DJ 林貓王', sub: '' },
      ],
    },
  },
  day2: {
    date: '11.30 SUN',
    stages: {
      '天空舞台': [
        { time: '14:40 - 15:30', artist: 'YELLOW黃宣', sub: '99% YELLOW, 1% CAMEO' },
        { time: '16:00 - 16:40', artist: '理想混蛋 Bestards', sub: '' },
        { time: '17:20 - 18:10', artist: 'ABAO阿爆 feat. 那屋瓦', sub: '' },
        { time: '19:00 - 19:50', artist: '楊乃文', sub: '' },
        { time: '20:40 - 21:30', artist: '伍佰&China Blue feat. 李宗盛', sub: '' },
      ],
      '微風舞台': [
        { time: '14:00 - 14:40', artist: '王彙筑 Hui Chu Wang', sub: '' },
        { time: '15:30 - 16:00', artist: '戴曉君 Sauljaljui', sub: '' },
        { time: '16:40 - 17:20', artist: 'Theseus式修斯', sub: '' },
        { time: '18:10 - 18:50', artist: '白安ANN', sub: '' },
        { time: '19:50 - 20:30', artist: '黃小楨', sub: '' },
      ],
      'Legacy 舞台': [
        { time: '13:20 - 14:00', artist: '特別企劃【寰宇龍虎豹】', sub: '鄭吉 + 迪拉 + 達誠' },
        { time: '14:50 - 15:30', artist: '呂允 Lu Yun', sub: '' },
        { time: '16:10 - 16:50', artist: 'Who Cares 胡凱兒', sub: '' },
        { time: '17:30 - 18:10', artist: '黃大謙', sub: '' },
        { time: '18:50 - 19:30', artist: '當代電影大師', sub: '' },
        { time: '20:10 - 20:50', artist: 'VH', sub: '' },
        { time: '21:40 - 22:30', artist: '老王樂隊', sub: 'ft. 四分衛阿山 ft. 守夜人旭章' },
      ],
      '街聲舞台': [
        { time: '13:00 - 13:20', artist: '【復展開幕】DJ DASU', sub: '' },
        { time: '13:50 - 14:20', artist: 'NIO', sub: '' },
        { time: '15:00 - 15:30', artist: '羊駝小姐 Malpaca', sub: '' },
        { time: '16:20 - 16:50', artist: '心頭肉 MindBodySoul', sub: '' },
        { time: '17:50 - 18:20', artist: '鄰序 Hogan T.', sub: '' },
        { time: '19:10 - 19:40', artist: 'COLD DEW', sub: '' },
        { time: '20:20 - 21:00', artist: '公館青少年', sub: '' },
        { time: '21:30 - 22:20', artist: '【末日之夜】DJ Mykal a.k.a.林哲儀', sub: '' },
      ],
    },
  },
}

export const signingEvents = {
  day1: [
    { time: '15:20 - 15:40', artist: '凹與山 Our Shame' },
    { time: '16:10 - 16:30', artist: '丹丹猫猫 = aDAN薛詒丹 x Miao Miao Flow' },
    { time: '17:10 - 17:30', artist: '紙鳶 Seizer' },
    { time: '18:10 - 18:30', artist: '就以斯JOYCE' },
    { time: '19:00 - 19:20', artist: '老貓偵探社' },
    { time: '19:50 - 20:10', artist: '傷心欲絕 Wayne\'s So Sad' },
  ],
  day2: [
    { time: '16:40 - 17:00', artist: '戴曉君 Sauljaljui' },
    { time: '17:30 - 17:50', artist: 'COLD DEW' },
    { time: '18:50 - 19:10', artist: '鄒序 Hogan T.' },
  ],
}

export const stageColors: StageColors = {
  '天空舞台': { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#60a5fa' },
  '微風舞台': { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#34d399' },
  'Legacy 舞台': { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', text: '#fbbf24' },
  '街聲舞台': { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#f87171' },
}