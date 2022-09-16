import { NextFunction } from 'express';
import { Collection, Mongoose, Schema } from 'mongoose';
import Category from '../models/Category';
import Skill from '../models/Skill';

const seedData = async () => {
    Skill.remove({});
    Category.remove({});

    let skillsAmount = await CreateSkills();
    let categoryAmount = await CreateCategories();
    let success = await MapSkillsToCategories();


    return { skills: skillsAmount, categories: categoryAmount, mappingSuccess: success };
};

export default { seedData };

async function CreateSkills() {
    let skillArray = [
        new Skill({
            subject: 'HTML',
            name: 'HTML5',
            description: 'HTML is the standard markup language for Web pages.',
            competency: 'Proficient'
        }),
        new Skill({
            subject: 'CSS',
            name: 'CSS3 Basics',
            description: '',
            competency: 'Proficient'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'JavaScript',
            description: '',
            competency: 'Proficient'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'React.js',
            description: '',
            competency: 'Experienced'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Vue.js',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Angular.js',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Next.js',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Security',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Meteor.js',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Callbacks',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Promises',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'JavaScript',
            name: 'Performance',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'Web Accessibility',
            name: 'Screen Readers',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'Web Accessibility',
            name: 'Aria-Labels',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'Web Accessibility',
            name: 'Basics',
            description: '',
            competency: 'Novice'
        }),
        new Skill({
            subject: 'Responsive & Adaptive Web Design',
            name: 'Mobile First',
            description: '',
            competency: 'Novice'
        })
    ];
    Skill.bulkSave(skillArray);

    return (await Skill.find({})).length;
}

async function CreateCategories() {
    let categoryArray = [
        new Category({
            name: 'UI Development'
        })
    ];
    Category.bulkSave(categoryArray);

    return (await Category.find({})).length;
}

async function MapSkillsToCategories() {
    let UICategory = await Category.findOne({
        name: 'UI Development'
    });

    let UISkills = await Skill.find({
        $or: [{ subject: 'HTML' }, { subject: 'CSS' }, { subject: 'JavaScript' }, { subject: 'Web Accessibility' }, { subject: 'Responsive & Adaptive Web Design' }]
    });

    UISkills.forEach((skill) => {
        UICategory?.skills.push(skill._id);
    });

    UICategory?.save();

    return true;
}
