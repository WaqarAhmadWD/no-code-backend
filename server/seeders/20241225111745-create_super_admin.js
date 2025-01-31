'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      id:1,
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password:'$2a$10$63xtZicgr1l6D2fiJmA7We2rlnB9lJcIoV1lzZAM9NCMOkcaCS6u2',
      slug:'admin_33ea9e7fda4b3c5d',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('role', [{
      id:1,
      name: 'super_admin',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('assign_roles_user', [{
      id:1,
      user_id: 1,
      role_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('module_registration', [{
      id:1,
      name:"user",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:2,
      name:"company",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:3,
      name:"role",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:4,
      name:"module_registration",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:5,
      name:"assign_roles_module",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:6,
      name:"assign_roles_user",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:7,
      name:"assign_user_company",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:8,
      name:"investement",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:9,
      name:"asset",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:10,
      name:"libality",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:11,
      name:"income",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:12,
      name:"expenditure",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:13,
      name:"depericable",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:14,
      name:"appreciable",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:15,
      name:"type",
      do_create:false,
      do_get:false,
      do_edit:false,
      do_delete:false,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:16,
      name:"investor",
      do_create:true,
      do_get:true,
      do_edit:true,
      do_delete:true,
      
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:17,
      name:"dashboard",
      do_create:false,
      do_get:true,
      do_edit:false,
      do_delete:false,
     
      created_at: new Date(),
      updated_at: new Date()
    },
    
    
  ], {});
  await queryInterface.bulkInsert('_type', [{
    id:1,
    name: 'Assets',
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:2,
    name: 'Liabilities',
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:3,
    name: 'Equity',
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:4,
    name: 'Income',
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:5,
    name: 'Expense',
    created_at: new Date(),
    updated_at: new Date()
  },], {});
  await queryInterface.bulkInsert('level_01', [{
    id:1,
    name: 'Current Assets',
    type_id:1,
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:2,
    name: 'Long Term Assets',
    type_id:1,
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:3,
    name: 'Other Assets',
    type_id:1,
    created_at: new Date(),
    updated_at: new Date()
  },{
    id:4,
    name: 'Other Liabilities',
    type_id:2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:5,
    name: 'Current Liabilities',
    type_id:2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:6,
    name: 'Long Term Liabilities',
    type_id:2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:7,
    name: 'Equity',
    type_id:3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:8,
    name: 'Equity',
    type_id:3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:9,
    name: 'Income',
    type_id:4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:10,
    name: 'Income',
    type_id:4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:11,
    name: 'Income',
    type_id:4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:12,
    name: 'Expense',
    type_id:5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:13,
    name: 'Expense',
    type_id:5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:14,
    name: 'Expense',
    type_id:5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id:15,
    name: 'Expense',
    type_id:5,
    created_at: new Date(),
    updated_at: new Date()
  },
], {});
await queryInterface.bulkInsert('level_02', [{
  id:1,
  name: 'Bank Account #1',
  level_01_id:1,
  created_at: new Date(),
  updated_at: new Date()
},{
  id:2,
  name: 'Bank Account #2',
  level_01_id:1,
  created_at: new Date(),
  updated_at: new Date()
},{
  id:3,
  name: 'Other Current Asset',
  level_01_id:1,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:4,
  name: 'Organizational Costs',
  level_01_id:2,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:5,
  name: 'Investments',
  level_01_id:2,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:6,
  name: 'Accounts Receivable',
  level_01_id:1,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:7,
  name: 'Pre-paid Expenses',
  level_01_id:3,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:8,
  name: 'Accumulated Depreciation',
  level_01_id:2,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:9,
  name: 'Accumulated Amortization',
  level_01_id:2,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:10,
  name: 'Other Liabilities',
  level_01_id:4,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:11,
  name: 'Accounts Payable',
  level_01_id:5,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:12,
  name: 'Notes Payable',
  level_01_id:6,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:13,
  name: 'Retained Earnings',
  level_01_id:8,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:14,
  name: 'Partners Capital',
  level_01_id:7,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:15,
  name: 'Gain (Loss) on Sale of Asset',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:16,
  name: 'Divident Income',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:17,
  name: 'Interest Income',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:18,
  name: 'Professional Fees',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:19,
  name: 'Admin Fees',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:20,
  name: 'Management Fees',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
{
  id:21,
  name: 'Other Expense',
  level_01_id:11,
  created_at: new Date(),
  updated_at: new Date()
},
], {});
  },
  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('user', null, {});
   await queryInterface.bulkDelete('role', null, {});
   await queryInterface.bulkDelete('assign_roles_user', null, {});
  }
};
