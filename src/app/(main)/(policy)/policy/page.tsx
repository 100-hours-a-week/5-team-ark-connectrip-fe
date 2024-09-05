'use client'
import React from 'react'

export default function Policy() {
  return (
    <div className='max-w-3xl w-full p-6 mb-6 text-gray-600 mt-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-6 text-black'>이용 약관</h1>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          1. 개인정보의 처리 목적
        </h2>
        <p className='mb-4'>
          &lt;커넥트립&gt;('app.murakano.site')은(는) 개인정보를 다음의 목적을
          위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지
          않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li className='font-semibold mb-2 text-black'>
            가. 홈페이지 회원가입 및 관리
          </li>
          <li className='mb-2'>
            회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
            회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스
            부정이용 방지, 만14세 미만 아동 개인정보 수집 시 법정대리인 동의
            여부 확인, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을
            목적으로 개인정보를 처리합니다.
          </li>
          <li className='font-semibold mb-2 text-black'>
            나. 재화 또는 서비스 제공
          </li>
          <li className='mb-2'>
            서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증 등을
            목적으로 개인정보를 처리합니다.
          </li>
          <li className='font-semibold mb-2 text-black'>
            다. 마케팅 및 광고에의 활용
          </li>
          <li className='mb-2'>
            신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보
            제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고
            게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에
            대한 통계 등을 목적으로 개인정보를 처리합니다.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          2. 개인정보 파일 현황
        </h2>
        <p className='mb-4'>개인정보 파일명 : 개인정보처리방침</p>
        <p className='mb-4'>
          개인정보 항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키,
          접속 IP 정보
        </p>
        <p className='mb-4'>수집방법 : 홈페이지</p>
        <p className='mb-4'>
          보유근거 : 개인정보보호법 제15조 (정보주체의 동의)
        </p>
        <p className='mb-4'>보유기간 : 5년</p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          3. 개인정보의 처리 및 보유 기간
        </h2>
        <p className='mb-4'>
          ① &lt;커넥트립&gt;은(는) 법령에 따른 개인정보 보유·이용기간 또는
          정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유, 이용기간
          내에서 개인정보를 처리, 보유합니다.
        </p>
        <p className='mb-4'>
          ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li className='font-semibold mb-2 text-black'>
            1. 홈페이지 회원가입 및 관리
          </li>
          <li className='mb-2'>
            홈페이지 회원가입 및 관리와 관련한 개인정보는 수집·이용에 관한
            동의일로부터 <span className='font-semibold'>5년</span>까지 위
            이용목적을 위하여 보유·이용됩니다.
          </li>
          <li className='mb-2'>
            보유근거 : 개인정보보호법 제15조 (정보주체의 동의)
          </li>
          <li className='font-semibold mb-2 text-black'>2. 서비스 제공</li>
          <li className='mb-2'>
            서비스 제공과 관련한 개인정보는 수집·이용에 관한 동의일로부터{' '}
            <span className='font-semibold'>5년</span>까지 위 이용목적을 위하여
            보유·이용됩니다.
          </li>
          <li className='mb-2'>
            보유근거 : 개인정보보호법 제15조 (정보주체의 동의)
          </li>
          <li className='font-semibold mb-2 text-black'>
            3. 마케팅 및 광고에의 활용
          </li>
          <li className='mb-2'>
            마케팅 및 광고에의 활용과 관련한 개인정보는 수집·이용에 관한
            동의일로부터 <span className='font-semibold'>5년</span>까지 위
            이용목적을 위하여 보유·이용됩니다.
          </li>
          <li className='mb-2'>
            보유근거 : 개인정보보호법 제15조 (정보주체의 동의)
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법
        </h2>
        <p className='mb-4'>
          이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li className='mb-2'>
            ① 정보주체는 &lt;커넥트립&gt;에 대해 언제든지 개인정보 열람, 정정,
            삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
          </li>
          <li className='mb-2'>
            ② 제1항에 따른 권리 행사는 &lt;커넥트립&gt;에 대해 개인정보 보호법
            시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여
            하실 수 있으며 &lt;커넥트립&gt;은(는) 이에 대해 지체 없이
            조치하겠습니다.
          </li>
          <li className='mb-2'>
            ③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자
            등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법
            시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
          </li>
          <li className='mb-2'>
            ④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항,
            제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.
          </li>
          <li className='mb-2'>
            ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집
            대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
          </li>
          <li className='mb-2'>
            ⑥ &lt;커넥트립&gt;은(는) 정보주체 권리에 따른 열람의 요구,
            정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가
            본인이거나 정당한 대리인인지를 확인합니다.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          5. 처리하는 개인정보의 항목 작성
        </h2>
        <p className='mb-4'>
          ① &lt;커넥트립&gt;은(는) 다음의 개인정보 항목을 처리하고 있습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li className='font-semibold mb-2 text-black'>
            1. 홈페이지 회원가입 및 관리
          </li>
          <li className='mb-2'>
            필수항목 : 이메일, 비밀번호, 서비스 이용 기록, 접속 로그, 쿠키, 접속
            IP 정보
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          6. 개인정보의 파기
        </h2>
        <p className='mb-4'>
          &lt;커넥트립&gt;은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는
          지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은
          다음과 같습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li className='font-semibold mb-2 text-black'>파기절차</li>
          <li className='mb-2'>
            이용자가 입력한 정보는 목적 달성 후 별도의 DB로 옮겨져(종이의 경우
            별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후
            혹은 즉시 파기됩니다.
          </li>
          <li className='mb-2'>
            이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른
            목적으로 이용되지 않습니다.
          </li>
          <li className='font-semibold mb-2 text-black'>파기기한</li>
          <li className='mb-2'>
            이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의
            종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의
            폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는
            개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그
            개인정보를 파기합니다.
          </li>
          <li className='font-semibold mb-2 text-black'>파기방법</li>
          <li className='mb-2'>
            전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
            사용합니다.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-semibold mb-4 text-black'>
          7. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
        </h2>
        <ul className='list-disc list-inside mb-4'>
          <li className='mb-2'>
            ① &lt;커넥트립&gt;은 개별적인 맞춤서비스를 제공하기 위해 이용정보를
            저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
          </li>
          <li className='mb-2'>
            ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
            브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의
            하드디스크에 저장되기도 합니다.
          </li>
        </ul>
      </section>
    </div>
  )
}
