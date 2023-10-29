﻿using ClashRoyaleClanWarsAPI.Application.Abstractions.CQRS;
using ClashRoyaleClanWarsAPI.Application.Interfaces.Repositories;
using ClashRoyaleClanWarsAPI.Domain.Common.Interfaces;
using ClashRoyaleClanWarsAPI.Domain.Shared;

namespace ClashRoyaleClanWarsAPI.Application.Common.Commands.UpdateModel;

public class UpdateModelCommandHandler<TModel, UId> : ICommandHandler<UpdateModelCommand<TModel, UId>>
    where TModel : IEntity<UId>
{
    private readonly IBaseRepository<TModel, UId> _repository;
    public UpdateModelCommandHandler(IBaseRepository<TModel, UId> repository)
    {
        _repository = repository;
    }

    public async Task<Result> Handle(UpdateModelCommand<TModel, UId> request, CancellationToken cancellationToken)
    {
        await _repository.Update(request.Model);

        return Result.Success();
    }
}
