/* 전공 적합도 검사 설정 파일 (템플릿)
 *
 * 이 파일만 고치면 문항·차원·전공 프로필을 바꿀 수 있다. 두 가지 모드:
 *   - 빠른 검사: quick: true 가 붙은 문항/가치 선택만 사용
 *   - 정밀 검사: 전체 문항 + 현실 조건
 * 문항 번호(배열 순서)로 답을 저장하므로, 빠른 검사의 답이 정밀 검사로 이어진다.
 * 문항을 추가·삭제하면 저장된 답은 초기화된다.
 *
 * 구성
 *  - DIMS       흥미·성향 차원 14개. riasec: 어떤 Holland 유형에 얼마나 기여하는지
 *  - RIASEC     Holland 흥미 6유형 (결과에 '흥미 코드' 로 표시)
 *  - LEARN      학습 스타일 5개
 *  - VALUES     직업가치관 8개 (phrases 3개: 가치 선택 문항에서 돌아가며 사용)
 *  - SECTIONS   검사 단계. kind: likert(5점 척도) | pairs(둘 중 하나) | conds(체크) | region
 *  - QUESTIONS  5점 척도 문항. w = 성향 차원 가중치, l = 학습 스타일 가중치 (음수면 '그렇다'일수록 감점)
 *  - PAIRS      가치 선택 문항 [가치A, 가치B]
 *  - CONDITIONS 현실 조건 (점수에는 반영하지 않고, 추천 전공별 맞춤 안내에 사용)
 *  - REGIONS    관심 지역 → 해당 어문 전공 가산점
 *  - LEARN_GROUPS / PROFILES  전공별 성향 가중치(0~3)와 학습 스타일 그룹(L)
 *
 * 전공 적합도 = 성향 일치도 × 0.8 + 학습 스타일 일치도 × 0.2 (+ 관심 지역 가산점)
 * 참고용 간이 검사이며 표준화된 심리검사가 아니다.
 */
window.BUFS_QUIZ = {
  MODES: {
    quick: { label: '빠른 검사', time: '약 3분', desc: '핵심 문항만으로 나와 맞는 전공을 빠르게 알아봐요.' },
    full:  { label: '정밀 검사', time: '약 10분', desc: '흥미 · 성격 · 강점 · 직업가치관 · 학습 스타일 · 현실 조건까지 종합해서 분석해요.' },
  },

  DIMS: {
    lang:     { label: '외국어·언어',   desc: '새로운 언어를 배우고 쓰는 것을 즐겨요',                    riasec: { A: .5, S: .3, I: .2 } },
    culture:  { label: '해외 문화·지역', desc: '다른 나라의 문화·역사·사회에 호기심이 많아요',            riasec: { I: .4, A: .4, S: .2 } },
    global:   { label: '해외 진출',     desc: '해외에서 일하거나 외국인과 협업하는 커리어를 원해요',      riasec: { E: .6, S: .4 } },
    care:     { label: '돌봄·상담',     desc: '사람의 마음과 어려움에 공감하고 돕고 싶어요',              riasec: { S: 1 } },
    edu:      { label: '가르치기·교육', desc: '설명하고 가르치며 누군가의 성장을 돕는 게 보람 있어요',    riasec: { S: 1 } },
    public:   { label: '공공·행정',     desc: '정책, 행정, 국제관계 같은 공적인 일에 관심이 있어요',      riasec: { C: .5, S: .3, E: .2 } },
    safety:   { label: '치안·보안',     desc: '사람과 정보를 지키고 정의를 바로 세우는 일에 끌려요',      riasec: { R: .6, S: .2, C: .2 } },
    biz:      { label: '경영·리더십',   desc: '사업을 계획하고 사람과 자원을 이끄는 걸 좋아해요',        riasec: { E: 1 } },
    market:   { label: '마케팅·홍보',   desc: '사람들의 마음을 읽고 설득하고 알리는 일이 재미있어요',    riasec: { E: .6, A: .4 } },
    numbers:  { label: '숫자·분석',     desc: '데이터와 숫자를 다루고 꼼꼼히 분석하는 게 편해요',        riasec: { C: .6, I: .4 } },
    tech:     { label: 'IT·기술',       desc: '컴퓨터, 프로그래밍, 기술의 원리가 궁금해요',              riasec: { I: .6, R: .4 } },
    creative: { label: '창작·콘텐츠',   desc: '영상, 그림, 글처럼 무언가를 만들어 내는 게 즐거워요',      riasec: { A: 1 } },
    active:   { label: '신체활동',      desc: '몸을 움직이고 운동·건강을 다루는 일이 좋아요',            riasec: { R: 1 } },
    service:  { label: '서비스·응대',   desc: '사람을 직접 만나 응대하고 좋은 경험을 주는 일이 좋아요',  riasec: { S: .6, E: .4 } },
  },

  RIASEC: {
    R: { label: '현실형', desc: '몸과 도구를 쓰는 활동, 눈에 보이는 결과를 내는 현장 중심의 일을 좋아해요.' },
    I: { label: '탐구형', desc: '원리를 파고들고 분석하며 문제를 논리적으로 푸는 것을 좋아해요.' },
    A: { label: '예술형', desc: '창의적으로 표현하고, 언어와 문화에 대한 감수성이 풍부해요.' },
    S: { label: '사회형', desc: '사람을 돕고 가르치고 소통하는 일에서 보람을 느껴요.' },
    E: { label: '진취형', desc: '사람을 이끌고 설득하며 새로운 일에 도전하는 것을 좋아해요.' },
    C: { label: '관습형', desc: '체계적이고 정확하게, 규칙에 따라 일을 처리하는 데 강해요.' },
  },

  LEARN: {
    repeat:  { label: '반복 연습형', desc: '꾸준히 외우고 반복하며 실력을 쌓는 공부가 맞아요. (어학, 법 과목 등)' },
    reading: { label: '읽기·토론형', desc: '읽고 생각하고 글과 말로 정리하는 공부가 맞아요. (사회과학, 인문 등)' },
    handson: { label: '실습·제작형', desc: '직접 만들어 보며 배우는 프로젝트형 공부가 맞아요. (IT, 콘텐츠 등)' },
    logic:   { label: '논리·문제풀이형', desc: '원리를 이해하고 정답을 찾아가는 공부가 맞아요. (수리, 회계, 공학 등)' },
    field:   { label: '현장·체험형', desc: '사람을 만나고 현장에서 부딪히며 배우는 공부가 맞아요. (서비스, 체육, 복지 등)' },
  },

  VALUES: {
    stability:    { label: '안정성',       careers: '공무원·공공기관, 교사, 대기업 사무직',
                    phrases: ['정년까지 안정적으로 다닐 수 있는 직장', '고용이 보장되어 미래 걱정이 적은 일', '규칙적이고 예측 가능한 업무'] },
    challenge:    { label: '변화·도전',    careers: '스타트업, 해외영업, 신사업 기획',
                    phrases: ['변화가 많아도 새로운 일에 계속 도전하는 직장', '매번 다른 프로젝트를 맡는 역동적인 일', '실패해도 새로운 시도를 할 수 있는 환경'] },
    pay:          { label: '경제적 보상',  careers: '금융, 영업·무역, 대기업',
                    phrases: ['일이 힘들어도 연봉이 높은 직장', '성과만큼 보상이 확실한 일', '빠르게 돈을 모을 수 있는 일'] },
    contribution: { label: '사회 기여',    careers: '국제개발·NGO, 사회복지, 재활·건강, 교육',
                    phrases: ['연봉은 평범해도 사회에 도움이 되는 일', '어려운 사람을 직접 돕는 일', '세상을 조금 더 나은 곳으로 만드는 일'] },
    expertise:    { label: '전문성',       careers: '통번역사, 개발자·보안 전문가, 회계사 등 자격 기반 전문직',
                    phrases: ['한 분야의 전문가로 인정받는 일', '전문 자격과 기술로 대체 불가능해지는 일', '깊이 있는 지식을 계속 쌓아 가는 일'] },
    autonomy:     { label: '자율성',       careers: '프리랜서(번역·콘텐츠), 창업, 크리에이터',
                    phrases: ['내가 원하는 시간과 방식대로 일하는 것', '누구의 지시 없이 스스로 결정하는 일', '회사에 얽매이지 않는 프리랜서·창업'] },
    global:       { label: '해외 경험',    careers: '해외취업·주재원, 항공·관광, 국제기구',
                    phrases: ['해외를 오가며 일하는 직업', '외국에서 살며 일할 기회가 있는 직장', '다양한 나라 사람들과 함께하는 일'] },
    balance:      { label: '일과 삶의 균형', careers: '공공기관, 교육기관, 연구·사무직',
                    phrases: ['퇴근 후 개인 생활이 보장되는 직장', '야근 없이 여유 있게 일하는 직장', '일과 삶의 균형을 지킬 수 있는 일'] },
  },

  SECTIONS: [
    { name: '관심사',      kind: 'likert', desc: '평소에 무엇에 끌리는지 알아봐요.' },
    { name: '성격',        kind: 'likert', desc: '나는 어떤 사람인지 떠올려 보세요.' },
    { name: '강점',        kind: 'likert', desc: '내가 잘하는 것, 자신 있는 것을 생각해 보세요.' },
    { name: '가치관',      kind: 'likert', desc: '졸업 후 어떤 일을 하며 살고 싶은지 생각해 보세요.' },
    { name: '학습 스타일', kind: 'likert', desc: '어떤 방식의 공부가 나에게 맞는지 알아봐요. 전공 4년을 버틸 수 있는지와 관련이 깊어요.' },
    { name: '직업가치관',  kind: 'pairs',  desc: '두 가지 중 내가 더 원하는 쪽을 골라 주세요. 둘 다 좋아도 하나만 골라야 해요.' },
    { name: '현실 조건',   kind: 'conds',  desc: '대학 생활에서 해 보고 싶은 것을 모두 골라 주세요. 추천 전공별로 맞춤 안내를 보여 드려요.', fullOnly: true },
    { name: '관심 지역',   kind: 'region', desc: '관심 있는 나라·지역이 있다면 골라 주세요. 여러 개 골라도 되고, 없으면 바로 결과를 봐도 돼요.' },
  ],

  QUESTIONS: [
    // ---------------- 관심사 (12)
    { sec: '관심사', quick: true, q: '외국어 단어나 표현을 새로 알게 되면 직접 써 보고 싶어진다.', w: { lang: 2 } },
    { sec: '관심사', q: '외국 드라마·영화·노래를 자막 없이 이해할 수 있으면 좋겠다고 생각한다.', w: { lang: 1.5, culture: 1 } },
    { sec: '관심사', quick: true, q: '다른 나라의 역사, 종교, 생활 방식을 다룬 영상이나 책을 즐겨 본다.', w: { culture: 2 } },
    { sec: '관심사', q: '외교, 국제기구, 국가 간 분쟁 같은 국제 뉴스에 관심이 간다.', w: { public: 1.5, global: 1 } },
    { sec: '관심사', quick: true, q: '범죄·수사 드라마나 실제 사건을 다룬 이야기가 흥미롭다.', w: { safety: 2 } },
    { sec: '관심사', q: '해킹이나 개인정보 유출 뉴스를 보면 어떻게 그런 일이 일어났는지 궁금하다.', w: { safety: 1, tech: 1.5 } },
    { sec: '관심사', quick: true, q: '새로 나온 앱이나 전자기기를 보면 어떻게 만들었는지 궁금하다.', w: { tech: 2 } },
    { sec: '관심사', q: '주식, 환율, 물가 같은 경제 이야기에 관심이 있다.', w: { numbers: 1.5, biz: 1 } },
    { sec: '관심사', quick: true, q: '어떤 광고나 SNS 게시물이 왜 인기를 끄는지 분석해 보곤 한다.', w: { market: 2, creative: 0.5 } },
    { sec: '관심사', quick: true, q: '유튜브 영상, 웹툰, 사진 같은 콘텐츠를 직접 만들어 보고 싶다.', w: { creative: 2 } },
    { sec: '관심사', quick: true, q: '운동하는 방법이나 건강·몸 관리에 관심이 많다.', w: { active: 2 } },
    { sec: '관심사', q: '여행 계획 짜기, 호텔·항공·축제 같은 여가 산업에 관심이 있다.', w: { service: 1.5, culture: 0.5 } },
    // ---------------- 성격 (11)
    { sec: '성격', quick: true, q: '친구들이 고민이 있을 때 나를 찾아와 이야기하는 편이다.', w: { care: 2 } },
    { sec: '성격', q: '처음 보는 사람과도 금방 편하게 대화할 수 있다.', w: { service: 1.5, global: 0.5 } },
    { sec: '성격', q: '혼자 집중해서 한 가지 문제를 끝까지 파고드는 것이 즐겁다.', w: { tech: 1, numbers: 1, service: -0.5 } },
    { sec: '성격', quick: true, q: '팀 프로젝트에서 계획을 세우고 사람들을 이끄는 역할을 자주 맡는다.', w: { biz: 2 } },
    { sec: '성격', q: '규칙과 원칙을 지키는 것이 중요하다고 생각한다.', w: { public: 1, safety: 1 } },
    { sec: '성격', q: '꼼꼼한 편이라 실수가 적다는 말을 듣는다.', w: { numbers: 1.5, public: 0.5 } },
    { sec: '성격', quick: true, q: '낯선 장소나 새로운 환경에서도 금방 적응한다.', w: { global: 2, culture: 0.5 } },
    { sec: '성격', quick: true, q: '누군가에게 무언가를 설명해 주고 그 사람이 이해했을 때 뿌듯하다.', w: { edu: 2 } },
    { sec: '성격', q: '아이디어가 많고, 남들과 다르게 해 보는 것을 좋아한다.', w: { creative: 1.5, market: 0.5 } },
    { sec: '성격', q: '정의롭지 않은 상황을 보면 그냥 넘어가지 못한다.', w: { safety: 1.5, public: 1 } },
    { sec: '성격', q: '가만히 앉아 있기보다 몸을 움직이며 현장에서 일하는 게 맞다.', w: { active: 1.5, safety: 0.5, service: 0.5 } },
    // ---------------- 강점 (12)
    { sec: '강점', q: '외국어 과목을 비교적 쉽게 익히는 편이었다.', w: { lang: 2 } },
    { sec: '강점', quick: true, q: '수학이나 계산 문제를 푸는 것이 어렵지 않다.', w: { numbers: 2 } },
    { sec: '강점', q: '논리적으로 순서를 세워서 생각하는 것을 잘한다.', w: { tech: 1.5, numbers: 0.5 } },
    { sec: '강점', q: '그림, 글쓰기, 영상 편집 등 표현하는 능력이 좋다는 말을 듣는다.', w: { creative: 2 } },
    { sec: '강점', q: '상대방의 기분을 잘 알아채고 배려한다.', w: { care: 1.5, service: 1 } },
    { sec: '강점', q: '체력이 좋고 몸을 쓰는 활동에 자신 있다.', w: { active: 2, safety: 0.5 } },
    { sec: '강점', q: '물건이나 아이디어를 남에게 설득력 있게 소개할 수 있다.', w: { market: 1.5, biz: 1 } },
    { sec: '강점', q: '엑셀, 코딩, 프로그램 사용 등 컴퓨터를 능숙하게 다룬다.', w: { tech: 1.5, numbers: 0.5 } },
    { sec: '강점', q: '여러 사람 앞에서 발표하거나 말하는 것에 자신 있다.', w: { edu: 1, market: 0.5, service: 0.5 } },
    { sec: '강점', q: '긴 글이나 자료를 읽고 핵심을 정리하는 것을 잘한다.', w: { public: 1, edu: 0.5, lang: 0.5 } },
    { sec: '강점', q: '표나 그래프를 보면 의미를 빨리 파악한다.', w: { numbers: 1.5, market: 0.5 } },
    { sec: '강점', quick: true, q: '아르바이트나 봉사에서 친절하다는 칭찬을 들은 적이 있다.', w: { service: 2 } },
    // ---------------- 가치관 (13)
    { sec: '가치관', q: '졸업 후 해외에서 일하거나 살아 보고 싶다.', w: { global: 2, lang: 0.5 } },
    { sec: '가치관', q: '외국인과 함께 일하며 문화 차이를 조율하는 일이 재미있을 것 같다.', w: { global: 1.5, culture: 1 } },
    { sec: '가치관', q: '사회적 약자를 돕거나 세상에 도움이 되는 일을 하고 싶다.', w: { care: 1.5, public: 0.5 } },
    { sec: '가치관', q: '전문 기술을 익혀 어디서든 인정받는 사람이 되고 싶다.', w: { tech: 1.5 } },
    { sec: '가치관', q: '언젠가 내 사업을 하거나 회사를 운영해 보고 싶다.', w: { biz: 2 } },
    { sec: '가치관', quick: true, q: '공무원처럼 안정적이고 공적인 직업이 끌린다.', w: { public: 2 } },
    { sec: '가치관', q: '경찰, 보안 전문가처럼 사람들의 안전을 지키는 일을 하고 싶다.', w: { safety: 2 } },
    { sec: '가치관', q: '사람들에게 즐거운 경험을 주는 일(여행, 호텔, 항공 등)에 보람을 느낄 것 같다.', w: { service: 2 } },
    { sec: '가치관', q: '교사나 강사처럼 누군가를 가르치는 직업에 관심이 있다.', w: { edu: 2 } },
    { sec: '가치관', q: '보람보다는 높은 연봉과 성과가 더 중요하다.', w: { biz: 1, numbers: 0.5, care: -0.5 } },
    { sec: '가치관', q: '내 이름을 건 작품이나 콘텐츠를 세상에 남기고 싶다.', w: { creative: 2 } },
    { sec: '가치관', q: '내가 기획한 홍보나 캠페인으로 사람들의 반응을 이끌어 내는 일을 하고 싶다.', w: { market: 2, biz: 0.5 } },
    { sec: '가치관', q: '사람들의 건강이나 재활을 돕는 일에 관심이 있다.', w: { active: 1.5, care: 1 } },
    // ---------------- 학습 스타일 (10)
    { sec: '학습 스타일', quick: true, q: '같은 표현을 수십 번 반복해 외우고 연습하는 공부도 꾸준히 할 수 있다.', l: { repeat: 2 } },
    { sec: '학습 스타일', q: '단어·문법처럼 차곡차곡 쌓아 가는 공부를 매일 조금씩 하는 게 맞다.', l: { repeat: 1.5 } },
    { sec: '학습 스타일', quick: true, q: '책이나 자료를 읽고 내 생각을 글로 정리하는 수업이 좋다.', l: { reading: 2 } },
    { sec: '학습 스타일', q: '사회 문제에 대해 토론하며 의견을 나누는 수업이 재미있다.', l: { reading: 1, field: 1 } },
    { sec: '학습 스타일', quick: true, q: '직접 만들어 보면서 배우는 실습·프로젝트 수업이 좋다.', l: { handson: 2 } },
    { sec: '학습 스타일', q: '결과물을 완성할 때까지 몇 시간이고 붙잡고 있을 수 있다.', l: { handson: 1.5, logic: 0.5 } },
    { sec: '학습 스타일', q: '정답이 딱 떨어지는 문제를 풀 때 성취감을 느낀다.', l: { logic: 2 } },
    { sec: '학습 스타일', q: '공식이나 원리를 이해하고 적용하는 공부가 편하다.', l: { logic: 1.5 } },
    { sec: '학습 스타일', q: '교실보다 현장에 나가 사람을 만나고 경험하며 배우는 게 좋다.', l: { field: 2 } },
    { sec: '학습 스타일', q: '몸으로 직접 해 보며 익히는 실기 수업이 좋다.', l: { field: 1, handson: 1 }, w: { active: 0.5 } },
  ],

  // 직업가치관: 둘 중 하나 고르기. 각 가치가 3번씩 등장한다.
  PAIRS: [
    { a: 'stability', b: 'challenge', quick: true },
    { a: 'pay', b: 'contribution', quick: true },
    { a: 'expertise', b: 'autonomy', quick: true },
    { a: 'global', b: 'balance', quick: true },
    { a: 'stability', b: 'pay' },
    { a: 'contribution', b: 'global' },
    { a: 'autonomy', b: 'balance' },
    { a: 'challenge', b: 'expertise' },
    { a: 'stability', b: 'autonomy' },
    { a: 'pay', b: 'global' },
    { a: 'contribution', b: 'expertise' },
    { a: 'challenge', b: 'balance' },
  ],

  // 현실 조건: 추천 전공의 수집된 글에서 키워드가 들어간 문장을 찾아 보여준다
  CONDITIONS: [
    { id: 'teach', short: '교직',  label: '교직이수로 교사 자격도 따고 싶다',      keywords: ['교직', '정교사', '교원'] },
    { id: 'cert', short: '자격증',   label: '재학 중에 자격증을 따고 싶다',          keywords: ['자격'] },
    { id: 'abroad', short: '해외연수', label: '해외 연수나 교환학생을 가고 싶다',      keywords: ['교환', '연수', '파견', '복수학위', '해외 대학', '해외대학'] },
    { id: 'job', short: '취업',    label: '졸업 후 바로 취업하고 싶다',            keywords: ['취업', '진출', '채용'] },
    { id: 'grad', short: '대학원',   label: '대학원 진학도 생각하고 있다',           keywords: ['대학원', '석사', '연구'] },
    { id: 'double', short: '복수전공', label: '복수전공·융합전공도 해 보고 싶다',      keywords: ['복수전공', '부전공', '융합전공', '연계전공'] },
  ],

  REGIONS: [
    { label: '영어권 (미국·영국 등)', majors: ['english', 'cee'] },
    { label: '유럽 (프랑스·독일·이탈리아 등)', majors: ['french', 'german', 'italy', 'eu'] },
    { label: '중남미 (스페인어·포르투갈어권)', majors: ['spain', 'portu'] },
    { label: '러시아·중앙아시아', majors: ['russia', 'cas'] },
    { label: '일본', majors: ['krsna'] },
    { label: '중국', majors: ['china'] },
    { label: '동남아시아', majors: ['thai', 'main', 'vietnam', 'myanmar'] },
    { label: '인도·중동', majors: ['hindi', 'arab', 'cas'] },
  ],
  REGION_BONUS: 8,   // 퍼센트 포인트
  LEARN_WEIGHT: 0.2, // 전공 적합도에서 학습 스타일이 차지하는 비중

  // 학습 스타일 그룹 (전공 PROFILES 의 L 값)
  LEARN_GROUPS: {
    language: { repeat: 3, reading: 1, field: 1 },
    langedu:  { repeat: 2, reading: 2, field: 1 },
    social:   { reading: 3, logic: 1, field: 1 },
    care:     { reading: 2, field: 2 },
    law:      { repeat: 2, reading: 2, logic: 1 },
    cyber:    { logic: 2, handson: 2, reading: 1 },
    sports:   { field: 2, handson: 2 },
    business: { logic: 2, reading: 1, handson: 1, field: 1 },
    planning: { handson: 2, field: 1, logic: 1 },
    numbers:  { logic: 3, repeat: 1 },
    service:  { field: 3, repeat: 1 },
    it:       { handson: 3, logic: 2 },
    creative: { handson: 3, field: 1 },
    mixed:    { reading: 1, handson: 1, logic: 1, field: 1 },
  },

  PROFILES: {
    // 유럽미주대학
    english:  { lang: 3, culture: 2, global: 2, edu: 1, service: 1, L: 'language' },
    french:   { lang: 3, culture: 3, global: 2, creative: 1, L: 'language' },
    german:   { lang: 3, culture: 2, global: 2, biz: 1, tech: 1, L: 'language' },
    spain:    { lang: 3, culture: 3, global: 2, biz: 1, L: 'language' },
    portu:    { lang: 3, culture: 3, global: 2, biz: 1, L: 'language' },
    italy:    { lang: 3, culture: 3, global: 1, creative: 1, service: 1, L: 'language' },
    russia:   { lang: 3, culture: 2, global: 2, public: 1, L: 'language' },
    eu:       { lang: 2, culture: 2, global: 3, biz: 2, numbers: 1, L: 'business' },
    // 아시아대학
    krsna:    { lang: 3, culture: 2, global: 2, biz: 1, tech: 1, L: 'language' },
    china:    { lang: 3, culture: 2, global: 2, biz: 2, L: 'language' },
    thai:     { lang: 3, culture: 3, global: 2, service: 1, L: 'language' },
    main:     { lang: 3, culture: 3, global: 2, biz: 1, L: 'language' },
    vietnam:  { lang: 3, culture: 2, global: 2, biz: 2, L: 'language' },
    myanmar:  { lang: 3, culture: 3, global: 2, public: 1, L: 'language' },
    hindi:    { lang: 3, culture: 3, global: 2, biz: 1, L: 'language' },
    arab:     { lang: 3, culture: 3, global: 2, public: 1, L: 'language' },
    cas:      { lang: 3, culture: 3, global: 2, biz: 1, L: 'language' },
    // 사회과학대학
    wellnet:    { care: 3, public: 2, edu: 1, L: 'care' },
    dcp:        { care: 3, edu: 1, numbers: 1, L: 'care' },
    inter_gk:   { edu: 3, lang: 2, culture: 2, global: 1, care: 1, L: 'langedu' },
    inter_dip1: { public: 3, global: 3, lang: 2, culture: 1, L: 'social' },
    gdc:        { global: 3, care: 2, public: 2, culture: 1, L: 'social' },
    gcb:        { culture: 2, biz: 2, market: 2, global: 1, creative: 1, L: 'planning' },
    police:     { safety: 3, public: 2, active: 2, L: 'law' },
    csp:        { safety: 3, tech: 2, public: 1, L: 'cyber' },
    '글로벌인재융합전공': { global: 1, biz: 1, tech: 1, creative: 1, lang: 1, culture: 1, L: 'mixed' },
    sports:     { active: 3, edu: 1, service: 1, L: 'sports' },
    srehab:     { active: 3, care: 2, edu: 1, L: 'sports' },
    welfare:    { active: 2, care: 3, public: 1, L: 'sports' },
    cee:        { lang: 3, edu: 3, care: 1, L: 'langedu' },
    // 상경대학
    biz:      { biz: 3, market: 1, numbers: 1, L: 'business' },
    acct:     { numbers: 3, biz: 1, public: 1, L: 'numbers' },
    gmkt:     { market: 3, biz: 2, creative: 1, global: 1, L: 'planning' },
    trade:    { biz: 3, global: 2, lang: 1, numbers: 1, L: 'business' },
    econo:    { numbers: 3, biz: 2, public: 1, L: 'numbers' },
    diss:     { biz: 2, lang: 2, global: 1, numbers: 1, service: 1, L: 'business' },
    tourism:  { service: 3, culture: 2, market: 1, global: 1, L: 'service' },
    hotel:    { service: 3, biz: 1, lang: 1, global: 1, L: 'service' },
    asm:      { service: 3, lang: 2, global: 1, active: 1, L: 'service' },
    bgs:      { biz: 3, creative: 2, market: 2, tech: 1, L: 'planning' },
    // 디지털미디어·IT대학
    iculture: { creative: 3, market: 1, tech: 1, L: 'creative' },
    webtoon:  { creative: 3, culture: 1, global: 1, market: 1, L: 'creative' },
    computer: { tech: 3, numbers: 2, L: 'it' },
    sw_sec:   { tech: 3, safety: 2, numbers: 1, L: 'it' },
    software: { tech: 3, numbers: 1, creative: 1, L: 'it' },
    sec:      { tech: 3, safety: 2, numbers: 1, L: 'it' },
    stat:     { numbers: 3, tech: 2, market: 1, L: 'numbers' },
    ere:      { tech: 3, numbers: 2, L: 'it' },
    se:       { tech: 2, numbers: 2, public: 1, L: 'it' },
  },

  LINKS: [
    { label: '커리어넷 진로심리검사 (직업흥미·적성·가치관)', url: 'https://www.career.go.kr' },
    { label: '고용24 직업심리검사 (직업선호도검사 등)', url: 'https://www.work24.go.kr' },
    { label: '부산외대 진로개발센터 상담', url: 'https://cdc.bufs.ac.kr/' },
  ],
};
