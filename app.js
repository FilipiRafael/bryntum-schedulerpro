import { SchedulerPro } from "/node_modules/@bryntum/schedulerpro/schedulerpro.module.js";

const project_planner = {
    cateogories: [
        {
            job_category_id: 5, 
            job_category_name: "Footing System", 
            qry_jobs: [{
                call_up_confirmation: "2022-10-15",
                contract_id: 112,
                created_at: "2022-10-12",
                days_to_job_end: 20,
                estimated_delivery: "2022-10-31",
                id: 17,
                job_id: 65,
                job_name: "Slab Systems",
                order_id: null,
                project_id: 57,
                updated_at: null,
            }]},
        {
            job_category_id: 25, 
            job_category_name: "Painting", qry_jobs: [{
                call_up_confirmation: "2022-10-05",
                contract_id: 110,
                created_at: "2022-10-12",
                days_to_job_end: 10,
                estimated_delivery: "2022-10-30",
                id: 20,
                job_id: 191,
                job_name: "External",
                order_id: null,
                project_id: 57,
                updated_at: null,
            }]
        },
        {
            job_category_id: 32, 
            job_category_name: "Garage Doors", 
            qry_jobs: [{
                call_up_confirmation: "2022-10-10",
                contract_id: 111,
                created_at: "2022-10-12",
                days_to_job_end: 15,
                estimated_delivery: "2022-10-31",
                id: 23,
                job_id: 233,
                job_name: "Garage Doors",
                order_id: null,
                project_id: 57,
                updated_at: null,
            }]
        }
    ],
    project_start_date: "2022-02-02",
    project_end_date: "2022-06-12",
    qry_project_info: {
        adress_line1: "41-41A Callanans Road",
        city: "Red Hill South",
        construction_period: "250",
        project_id: 57,
        project_name: "Callanans Road",
        project_type: "Detached",
        start_date: "2022-10-05T00:00:00.000Z",
    }
}

let dependenciesData = [];
let resourcesData = [];
let eventsData = [];

project_planner.cateogories.forEach((category, index) => {

    resourcesData.push({
        id : category.job_category_id,
        name : category.job_category_name,
        capacity : 100,
        image : false,
        iconCls : 'b-icon b-fa-building',
        expanded: true,
        children: [{
            id: category.qry_jobs[0].job_id,
            resourceId : category.job_category_id,
            name : category.qry_jobs[0].job_name,
            startDate : category.qry_jobs[0].estimated_delivery,
            duration : category.qry_jobs[0].days_to_job_end,
            durationUnit : 'd',
            preamble : `${betweenDays} day`,
            resizable: false,
            expanded: true,
        }]
    });

    const callUpDate = new Date(category.qry_jobs[0].call_up_confirmation);
    const scheduleDate = new Date(category.qry_jobs[0].estimated_delivery);

    var betweenTime = scheduleDate.getTime() - callUpDate.getTime();
    var betweenDays = betweenTime / (1000 * 3600 * 24);

    eventsData.push({
        id : category.qry_jobs[0].id,
        resourceId : category.qry_jobs[0].job_id,
        name : category.qry_jobs[0].job_name,
        startDate : category.qry_jobs[0].estimated_delivery,
        duration : category.qry_jobs[0].days_to_job_end,
        durationUnit : 'd',
        resizable: false,
        preamble : `${betweenDays} day`,
        eventColor : '#004600',
        eventStyle: 'border'
    });

    if (index !== project_planner.cateogories.length - 1) {
        dependenciesData.push({
            id        : category.qry_jobs[0].id,
            from : category.qry_jobs[0].id,
            to  : project_planner.cateogories[index + 1]?.qry_jobs[0].id
        });
    }

})

new SchedulerPro({
    features : {
        eventBuffer: true,
        dependencies: true,
        dependencyEdit: true,
        tree      : true,
        timeRanges : {
            showCurrentTimeLine : true,
            showHeaderElements  : true,
        },
        columnLines: false,
    },

    project : {
        resourcesData: resourcesData,
        eventsData: eventsData,
        dependenciesData: dependenciesData
    },

    appendTo : 'container',
    autoHeight : true,
    rowHeight: 60,
    // startDate  : project_planner.project_start_date,
    // endDate    : project_planner.project_end_date,
    startDate: "2022-10-01",
    endDate: "2022-12-20",
    barMargin  : 12,    

    columns : [
        { 
            type : 'tree', 
            field : 'name', 
            text : 'Jobs', 
            showEventCount : false, 
            width : 250 
        }
    ],
});