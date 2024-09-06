'use client'
import React from 'react'

export default function Privacy() {
  return (
    <div className='max-w-3xl w-full p-6 mb-6 text-gray-600 mt-6 rounded-lg'>
      <h1 className='text-2xl font-bold mb-4 text-black'>
        개인 정보 처리 방침
      </h1>

      <section className='mb-6'>
        <h2 className='text-base mb-4'>
          개인정보보호법에 따라 커넥트립에 회원가입 신청하시는 분께 수집하는
          개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및
          이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내
          드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
        </h2>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          1. 수집하는 개인정보
        </h2>
        <p className='mb-4'>
          이용자는 회원가입을 하지 않아도 단어 검색서비스를 회원과 동일하게
          이용할 수 있습니다. 이용자가 단어 등록, 수정 요청 서비스를 이용하기
          위해 회원가입을 할 경우, 커넥트립는 서비스 이용을 위해 필요한 최소한의
          개인정보를 수집합니다.
        </p>
        <p className='mb-4'>
          회원가입 시점에 커넥트립가 이용자로부터 수집하는 개인정보는 아래와
          같습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>
            회원 가입 시 필수항목으로 이메일, 비밀번호를 수집합니다. 실명 인증된
            아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입
            확인정보(DI), 내외국인 정보를 함께 수집합니다.
          </li>
          <li>
            카카오 계정으로 회원가입 시에는 필수항목으로 카카오톡 닉네임을,
            선택항목으로 이메일을 수집합니다.
          </li>
        </ul>
        <p className='mb-4'>
          서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>
            커넥트립 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서
            해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다.
            추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서
            이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적,
            개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
          </li>
        </ul>
        <p className='mb-4'>
          서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록, 기기정보,
          위치정보가 생성되어 수집될 수 있습니다.
        </p>
        <ul className='list-disc list-inside mb-6'>
          <li>
            구체적으로 1) 서비스 이용 과정에서 이용자에 관한 정보를 자동화된
            방법으로 생성하거나 이용자가 입력한 정보를 저장(수집)될 수 있습니다.
            이와 같이 수집된 정보는 개인정보와의 연계 여부 등에 따라 개인정보에
            해당할 수 있고, 개인정보에 해당하지 않을 수도 있습니다.
          </li>
        </ul>

        <h3 className='text-lg font-semibold mb-2 text-black'>
          생성정보 수집에 대한 추가 설명
        </h3>

        <h4 className='text-base font-semibold mb-1 text-black'>
          IP(Internet Protocol) 주소란?
        </h4>
        <p className='mb-4'>
          IP 주소는 인터넷 망 사업자가 인터넷에 접속하는 이용자의 PC 등 기기에
          부여하는 온라인 주소정보 입니다. IP 주소가 개인정보에 해당하는지
          여부에 대해서는 각국마다 매우 다양한 견해가 있습니다.
        </p>

        <h4 className='text-base font-semibold mb-1 text-black'>
          서비스 이용기록이란?
        </h4>
        <p className='mb-4'>
          커넥트립 접속 일시, 이용한 서비스 목록 및 서비스 이용 과정에서
          발생하는 정상 또는 비정상 로그 등을 의미합니다. 정보주체가 식별되는
          일부 서비스 이용기록(행태정보 포함)과 관련한 처리 목적 등에 대해서는
          본 개인정보 처리방침에서 규정하고 있는 수집하는 개인정보, 수집한
          개인정보의 이용, 개인정보의 파기 등에서 설명하고 있습니다. 이는 서비스
          제공을 위해 수반되는 것으로 이를 거부하시는 경우 서비스 이용에 제한이
          있을 수 있으며, 관련하여서는 담당자에게로 문의해주시길 바랍니다.
        </p>

        <h4 className='text-base font-semibold mb-1 text-black'>
          쿠키(cookie)란?
        </h4>
        <p className='mb-4'>
          쿠키는 이용자가 웹사이트를 접속할 때에 해당 웹사이트에서 이용자의
          웹브라우저를 통해 이용자의 PC에 저장하는 매우 작은 크기의 텍스트
          파일입니다. 이후 이용자가 다시 웹사이트를 방문할 경우 웹사이트 서버는
          이용자 PC에 저장된 쿠키의 내용을 읽어 이용자가 설정한 서비스 이용
          환경을 유지하여 편리한 인터넷 서비스 이용을 가능케 합니다. 또한 방문한
          서비스 정보, 서비스 접속 시간 및 빈도, 서비스 이용 과정에서 생성된
          또는 제공(입력)한 정보 등을 분석하여 이용자의 취향과 관심에 특화된
          서비스(광고 포함)를 제공할 수 있습니다. 이용자는 쿠키에 대한 선택권을
          가지고 있으며, 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를
          허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의
          저장을 거부할 수도 있습니다. 다만, 쿠키의 저장을 거부할 경우에는
          로그인이 필요한 커넥트립 일부 서비스의 이용에 불편이 있을 수 있습니다.
        </p>

        <h4 className='text-base font-semibold mb-1 text-black'>
          웹 브라우저에서 쿠키 허용/차단 방법
        </h4>
        <ul className='list-disc list-inside mb-4'>
          <li>
            크롬(Chrome) : 웹 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt;
            인터넷 사용 기록 삭제
          </li>
          <li>
            엣지(Edge) : 웹 브라우저 설정 &gt; 쿠키 및 사이트 권한 &gt; 쿠키 및
            사이트 데이터 관리 및 삭제
          </li>
        </ul>

        <h4 className='text-base font-semibold mb-1 text-black'>
          모바일 브라우저에서 쿠키 허용/차단
        </h4>
        <ul className='list-disc list-inside mb-4'>
          <li>
            크롬(Chrome) : 모바일 브라우저 설정 &gt; 개인정보 보호 및 보안 &gt;
            인터넷 사용 기록 삭제
          </li>
          <li>
            사파리(Safari) : 모바일 기기 설정 &gt; 사파리(Safari) &gt; 고급 &gt;
            모든 쿠키 차단
          </li>
          <li>
            삼성 인터넷 : 모바일 브라우저 설정 &gt; 인터넷 사용 기록 &gt; 인터넷
            사용 기록 삭제
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          2. 수집한 개인정보의 이용
        </h2>
        <p className='mb-4'>
          커넥트립 서비스의 회원관리등 아래의 목적으로만 개인정보를 이용합니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>
            회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등
            회원관리를 위하여 개인정보를 이용합니다.
          </li>
          <li>
            법령 및 커넥트립 이용약관을 위반하는 회원에 대한 이용 제한 조치,
            부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에
            대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의
            고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및
            서비스 운영을 위하여 개인정보를 이용합니다.
          </li>
          <li>
            서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스
            분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를
            이용합니다.
          </li>
          <li>
            보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는
            서비스 이용환경 구축을 위해 개인정보를 이용합니다.
          </li>
        </ul>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          3. 개인정보 보관기간
        </h2>
        <p className='mb-4'>
          회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고
          있습니다.
        </p>
        <p className='mb-4'>
          전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및
          전자거래기본법, 통신비밀보호법 등 관련 법령에서 보존할 필요가 있는
          경우에는 해당 법령에서 정한 기간 동안 개인정보를 보관합니다.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          4. 개인정보의 파기
        </h2>
        <p className='mb-4'>
          회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고
          있습니다.
        </p>
        <p className='mb-4'>
          전자상거래 등에서의 소비자 보호에 관한 법률, 전자문서 및
          전자거래기본법, 통신비밀보호법 등 관련 법령에서 보존할 필요가 있는
          경우에는 해당 법령에서 정한 기간 동안 개인정보를 보관합니다.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          5. 개인정보 처리방침 변경
        </h2>
        <p className='mb-4'>
          본 개인정보 처리방침은 법령의 변경이나 회사의 정책에 따라 수시로
          변경될 수 있으며, 변경 사항은 웹사이트 공지사항 또는 개별 공지를 통해
          안내됩니다.
        </p>
      </section>

      <section className='mb-6'>
        <h2 className='text-xl font-medium mb-2 text-black'>
          6. 개인정보 보호책임자
        </h2>
        <p className='mb-4'>
          개인정보 보호 관련 문의 및 요청 사항은 다음과 같이 처리하고 있습니다.
        </p>
        <ul className='list-disc list-inside mb-4'>
          <li>담당자: 개인정보 보호 담당자</li>
          <li>연락처: 개인정보 보호 담당자의 이메일 주소</li>
        </ul>
      </section>

      <p className='text-sm text-gray-500 mb-10'>
        이 개인정보 처리방침은 [YYYY년 MM월 DD일]부터 시행됩니다.
      </p>
    </div>
  )
}
