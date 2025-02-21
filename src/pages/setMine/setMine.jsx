import { useState, useContext } from "react";
import './setMine.css';
import { useLocation } from "wouter";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { UserContext } from "../../utils/userContext";

const SetMine = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [, setLocation] = useLocation();
    const [nickName, setNickname] = useState('');
    const [gender, setGender] = useState('');
    const [birthdayMonth, setBirthdayMonth] = useState('');
    const [birthdayDay, setBirthdayDay] = useState('');
    const [status, setStatus] = useState('');
    const [interest, setInterest] = useState('');
    const [error, setError] = useState(''); // 错误提示

    const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12月
    const daysInMonth = (month) => {
        if (month === 2) return 29; // 2月固定29天
        if ([4, 6, 9, 11].includes(month)) return 30;
        return 31;
    };

    const days = birthdayMonth ? Array.from({ length: daysInMonth(birthdayMonth) }, (_, i) => i + 1) : [];

    const warn = {
        placeholder: '不符合规范，请重新填写',
        style: {
            borderColor: 'red',
        }
    };

    const setList = [
        {
            title: "昵称",
            value: nickName,
            placeholder: 'Sduers',
            setValue: (e) => {
                if (e.target.value.length <= 10) {
                    setNickname(e.target.value);
                    setError('');
                } else {
                    setError('昵称不能超过10个字符');
                }
            }
        },
        {
            title: "性别",
            value: gender,
            placeholder: '请选择性别',
            setValue: (e) => setGender(e.target.value)
        },
        {
            title: "生日",
            value: `${birthdayMonth}/${birthdayDay}`,
            placeholder: '请选择生日',
            setValue: () => {} // 无需处理，由下拉框单独控制
        },
        {
            title: "状态",
            value: status,
            placeholder: '饥饿中/睡觉ing.../困了',
            setValue: (e) => {
                if (e.target.value.length <= 10) {
                    setStatus(e.target.value);
                    setError('');
                } else {
                    setError('状态不能超过10个字符');
                }
            }
        }
    ];
    
    <textarea
        placeholder="跑步/打篮球/阅读/看小说/追剧/追番/..."
        value={interest}
        onChange={(e) => {
            if (e.target.value.length <= 10) {
                setInterest(e.target.value);
                setError('');
            } else {
                setError('兴趣不能超过10个字符');
            }
        }}
        className="myTextarea"
        rows="3"
        cols="23"
    ></textarea>

    const pass = () => {
        setLocation('/startBlessing');
    };

    const update = () => {
        if (!nickName || !gender || !birthdayMonth || !birthdayDay || !interest) {
            setError('请填写所有必填项!');
            return;
        }

        if (nickName.length > 10) {
            setError('昵称不能超过10个字符');
            return;
        }

        const Data = {
            nickName,
            birthday: `${birthdayMonth.toString().padStart(2, '0')}/${birthdayDay.toString().padStart(2, '0')}`,
            interests: interest,
            status,
            gender
        };

        console.log(Data);
        load(Data);
    };

    const load = async (Data) => {
        try {
            const token = getToken();
            const res = await axios.put('http://192.168.192.26:8080/profile', { Data }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
            setUserData({
                ...userData,
                setData: res.data
            });
            pass();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className='set-background'>
                <div className="set-top">
                    <div className="set-top1">注册</div>
                    <div onClick={pass} className="set-top2">跳过</div>
                </div>
                <form className="setForm">
                    {setList.map((item) => (
                        <div className="set-ctn" key={item.title}>
                            <div className="set-title">{item.title}</div>
                            {item.title === "性别" ? (
                                <select
                                    className="set-input"
                                    value={item.value}
                                    onChange={item.setValue}
                                >
                                    <option value="">请选择性别</option>
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                    <option value="未知">未知</option>
                                </select>
                            ) : item.title === "生日" ? (
                                <div className="birthday-container">
                                    <select
                                        className="set-input"
                                        value={birthdayMonth}
                                        onChange={(e) => setBirthdayMonth(Number(e.target.value))}
                                    >
                                        <option value="">月</option>
                                        {months.map((month) => (
                                            <option key={month} value={month}>{month}月</option>
                                        ))}
                                    </select>
                                    <select
                                        className="set-input"
                                        value={birthdayDay}
                                        onChange={(e) => setBirthdayDay(Number(e.target.value))}
                                        disabled={!birthdayMonth}
                                    >
                                        <option value="">日</option>
                                        {days.map((day) => (
                                            <option key={day} value={day}>{day}日</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <input
                                    className="set-input"
                                    id={item.title}
                                    placeholder={item.placeholder}
                                    value={item.value}
                                    onChange={item.setValue}
                                    maxLength={item.title === "昵称" ? 10 : null}
                                />
                            )}
                        </div>
                    ))}
                    <div className='set-text'>
                        <div className="set-title">兴趣</div>
                        <textarea
                            placeholder="跑步/打篮球/阅读/看小说/追剧/追番/..."
                            value={interest}
                            onChange={(e) => setInterest(e.target.value)}
                            className="myTextarea"
                            rows="3"
                            cols="23"
                        ></textarea>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <div onClick={update} className="set-btn"></div>
            </div>
        </>
    );
};

export default SetMine;