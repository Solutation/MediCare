import removeVietnameseTones from './removeVietnameseTones';

export function checkSearch(value) {
    const Allergy = ['di ung'];
    const Blood = ['mau'];
    const Digestive = ['tieu hoa'];
    const ENT = ['tai', 'mui', 'hong'];
    const Eye = ['mat', 'vong mac'];
    const Sport = ['the thao'];
    const Mentality = ['tam ly', 'tam than'];
    const HeartRespi = ['tuc nguc', 'kho tho'];
    const Medicine = ['cay thuoc'];
    const Dental = ['rang', 'mieng', 'nuou'];
    const Respiratory = ['ho hap', 'so mui'];
    const Skin = ['da'];

    if (Allergy.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 1;
    else if (Blood.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 2;
    else if (Digestive.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 3;
    else if (ENT.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 4;
    else if (Eye.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 5;
    else if (Sport.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 6;
    else if (Mentality.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 7;
    else if (HeartRespi.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 8;
    else if (Medicine.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 9;
    else if (Dental.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 10;
    else if (Respiratory.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1))
        return 11;
    else if (Skin.some((obj) => obj.indexOf(removeVietnameseTones(value).toLowerCase().trim()) !== -1)) return 12;
    else return 0;
}
