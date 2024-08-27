import React from 'react'

const HostContent: React.FC = () => {
  return (
    <div>
      <div>
        <h1>동행 상태 : 모집 중</h1>
        <h2>동행 신청 목록</h2>
        <p>
          모집이 완료되었다면 모집 종료를 클릭해주세요! 더 이상 신청 내역이
          보이지 않습니다.
        </p>
        {/* 여기에 동행 신청 목록 내용을 추가 */}
        <p>신청자 1</p>
        <p>신청자 2</p>
        <br />
        <h2>대화 상대</h2>
        <p>닉네임 1</p>
        <p>닉네임 2</p>
      </div>
    </div>
  )
}

export default HostContent
